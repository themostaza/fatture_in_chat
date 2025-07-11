import { NextRequest, NextResponse } from "next/server";
import { supabase, getCurrentUser } from "@/lib/supabase/client";
import { ENTITY_TYPES } from "@/lib/supabase/entityTypes";

// Tipi per le entità
interface EntityLink {
  entity_id: string;
}

interface Entity {
  id: string;
  name: string;
  body?: {
    partita_iva: string;
    tipo: string;
    disabled?: boolean;
  };
}

interface UpdateData {
  updated_at: string;
  name?: string;
  body?: {
    partita_iva?: string;
    tipo?: string;
    disabled?: boolean;
  };
}

// GET: lista entità collegate all'utente
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.split(' ')[1];
    const user = await getCurrentUser(accessToken);
    if (!user) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }
    // Recupera il profilo dell'utente
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (profileError || !profile) {
      return NextResponse.json({ error: "Profilo non trovato" }, { status: 404 });
    }
    // Trova tutte le entità collegate al profilo (non disabilitate)
    const { data: links, error: linksError } = await supabase
      .from("link_entities_profiles")
      .select("entity_id")
      .eq("profile_id", profile.id);
    if (linksError) {
      return NextResponse.json({ error: "Errore ricerca collegamenti" }, { status: 500 });
    }
    const entityIds = links.map((l: EntityLink) => l.entity_id);
    if (!entityIds.length) {
      return NextResponse.json({ entities: [] }, { status: 200 });
    }
    const { data: entities, error: entitiesError } = await supabase
      .from("entities")
      .select("id, name, body")
      .in("id", entityIds);
    if (entitiesError) {
      return NextResponse.json({ error: "Errore ricerca entità" }, { status: 500 });
    }
    // Filtra quelle disabilitate
    const filtered = entities.filter((e: Entity) => !e.body?.disabled);
    return NextResponse.json({ entities: filtered }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Errore generico" }, { status: 500 });
  }
}

// POST: crea nuova entità e collega al profilo
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.split(' ')[1];
    const user = await getCurrentUser(accessToken);
    console.log("[API] user:", user);
    if (!user) {
      console.log("[API] Non autenticato");
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }
    const { name, partita_iva, tipo } = await req.json();
    console.log("[API] Dati ricevuti:", { name, partita_iva, tipo });
    if (!name || !partita_iva || !tipo) {
      console.log("[API] Dati mancanti");
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }
    if (!ENTITY_TYPES.includes(tipo)) {
      console.log("[API] Tipologia non valida:", tipo);
      return NextResponse.json({ error: "Tipologia non valida" }, { status: 400 });
    }
    // Recupera il profilo dell'utente
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();
    console.log("[API] Profilo:", profile, profileError);
    if (profileError || !profile) {
      console.log("[API] Profilo non trovato");
      return NextResponse.json({ error: "Profilo non trovato" }, { status: 404 });
    }
    // Crea la nuova entità
    const { data: entity, error: entityError } = await supabase
      .from("entities")
      .insert({
        name,
        body: { partita_iva, tipo }
      })
      .select()
      .single();
    console.log("[API] Entità creata:", entity, entityError);
    if (entityError || !entity) {
      console.log("[API] Errore creazione entità:", entityError);
      return NextResponse.json({ error: "Errore creazione entità" }, { status: 500 });
    }
    // Collega l'entità al profilo con ruolo 'creator'
    const { error: linkError } = await supabase
      .from("link_entities_profiles")
      .insert({
        entity_id: entity.id,
        profile_id: profile.id,
        role: "creator"
      });
    console.log("[API] Link entità-profilo errore:", linkError);
    if (linkError) {
      console.log("[API] Errore collegamento entità-profilo:", linkError);
      return NextResponse.json({ error: "Errore collegamento entità-profilo" }, { status: 500 });
    }
    return NextResponse.json({ entity }, { status: 201 });
  } catch (e) {
    console.log("[API] Errore generico:", e);
    return NextResponse.json({ error: "Errore generico" }, { status: 500 });
  }
}

// PATCH: modifica o disabilita entità (body: { entity_id, ... })
export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.split(' ')[1];
    const user = await getCurrentUser(accessToken);
    if (!user) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }
    const { entity_id, name, partita_iva, tipo, disable } = await req.json();
    if (!entity_id) {
      return NextResponse.json({ error: "ID entità mancante" }, { status: 400 });
    }
    // Recupera il profilo dell'utente
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (profileError || !profile) {
      return NextResponse.json({ error: "Profilo non trovato" }, { status: 404 });
    }
    // Verifica che l'utente abbia un collegamento con l'entità
    const { data: link, error: linkError } = await supabase
      .from("link_entities_profiles")
      .select("role")
      .eq("entity_id", entity_id)
      .eq("profile_id", profile.id)
      .maybeSingle();
    if (linkError || !link) {
      return NextResponse.json({ error: "Permessi insufficienti" }, { status: 403 });
    }
    // Recupera l'attuale body
    const { data: entity, error: entityError } = await supabase
      .from("entities")
      .select("body")
      .eq("id", entity_id)
      .single();
    if (entityError || !entity) {
      return NextResponse.json({ error: "Entità non trovata" }, { status: 404 });
    }
    const updateData: UpdateData = { updated_at: new Date().toISOString() };
    const newBody = { ...entity.body };
    if (disable) {
      newBody.disabled = true;
    }
    if (name) updateData.name = name;
    if (partita_iva) newBody.partita_iva = partita_iva;
    if (tipo) {
      if (!ENTITY_TYPES.includes(tipo)) {
        return NextResponse.json({ error: "Tipologia non valida" }, { status: 400 });
      }
      newBody.tipo = tipo;
    }
    updateData.body = newBody;
    const { data: updated, error: updateError } = await supabase
      .from("entities")
      .update(updateData)
      .eq("id", entity_id)
      .select()
      .single();
    if (updateError || !updated) {
      return NextResponse.json({ error: "Errore aggiornamento entità" }, { status: 500 });
    }
    return NextResponse.json({ entity: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Errore generico" }, { status: 500 });
  }
} 