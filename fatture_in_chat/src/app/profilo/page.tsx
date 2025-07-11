"use client";
import React, { useState } from "react";
import { Plus, Info, KeyRound, Eye, EyeOff, X } from "lucide-react";
import supabase, { getCurrentUser } from "@/lib/supabase/client";
import { ENTITY_TYPES } from "@/lib/supabase/entityTypes";

// Definizione dei tipi
interface User {
  id: string;
  nome?: string;
  email?: string;
}

interface Entity {
  id: string;
  name: string;
  body?: {
    partita_iva: string;
    tipo: string;
  };
}

async function fetchUserEntities() {
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token;
  const res = await fetch("/api/entities", {
    headers: {
      ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.entities || [];
}

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [entitiesLoading, setEntitiesLoading] = useState(true);
  const [showAddEntityModal, setShowAddEntityModal] = useState(false);
  const [addEntityLoading, setAddEntityLoading] = useState(false);
  const [addEntityError, setAddEntityError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', partita_iva: '', tipo: ENTITY_TYPES[0] });

  // 1. Stato per la modale di modifica e l'entità selezionata
  const [showEditEntityModal, setShowEditEntityModal] = useState(false);
  const [editEntity, setEditEntity] = useState<Entity | null>(null);
  const [editForm, setEditForm] = useState({ name: '', partita_iva: '', tipo: ENTITY_TYPES[0] });
  const [editEntityLoading, setEditEntityLoading] = useState(false);
  const [editEntityError, setEditEntityError] = useState<string | null>(null);

  React.useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
    fetchUserEntities().then((ents) => {
      setEntities(ents);
      setEntitiesLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-8 w-full max-w-3xl mx-auto text-center text-gray-500 dark:text-gray-400">Caricamento profilo...</div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 w-full max-w-3xl mx-auto text-center text-red-500 dark:text-red-400">Utente non autenticato.</div>
    );
  }

  async function handleAddEntity(e: React.FormEvent) {
    e.preventDefault();
    setAddEntityLoading(true);
    setAddEntityError(null);
    // Recupera il token JWT dalla sessione Supabase
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
    const res = await fetch('/api/entities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setAddEntityError(data.error || 'Errore creazione entità');
      setAddEntityLoading(false);
      return;
    }
    setAddEntityLoading(false);
    setForm({ name: '', partita_iva: '', tipo: ENTITY_TYPES[0] });
    setShowAddEntityModal(false);
    // Refetch entità
    setEntitiesLoading(true);
    fetchUserEntities().then((ents) => {
      setEntities(ents);
      setEntitiesLoading(false);
    });
  }

  // 2. Funzione per aprire la modale di modifica
  function handleEditClick(entity: Entity) {
    setEditEntity(entity);
    setEditForm({
      name: entity.name || '',
      partita_iva: entity.body?.partita_iva || '',
      tipo: entity.body?.tipo || ENTITY_TYPES[0],
    });
    setShowEditEntityModal(true);
  }

  // 3. Funzione per salvare la modifica
  async function handleEditEntity(e: React.FormEvent) {
    e.preventDefault();
    if (!editEntity) return;
    
    setEditEntityLoading(true);
    setEditEntityError(null);
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
    const res = await fetch('/api/entities', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({
        entity_id: editEntity.id,
        name: editForm.name,
        partita_iva: editForm.partita_iva,
        tipo: editForm.tipo,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setEditEntityError(data.error || 'Errore modifica entità');
      setEditEntityLoading(false);
      return;
    }
    setEditEntityLoading(false);
    setShowEditEntityModal(false);
    setEditEntity(null);
    // Refetch entità
    setEntitiesLoading(true);
    fetchUserEntities().then((ents) => {
      setEntities(ents);
      setEntitiesLoading(false);
    });
  }

  return (
    <div className="p-4 sm:p-8 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profilo</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
            <div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs">Nome</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{user.nome || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs">Email</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{user.email}</span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 text-gray-900 font-semibold shadow hover:bg-amber-300 transition-all mt-4 sm:mt-0"
            onClick={() => setShowModal(true)}
          >
            <KeyRound size={18} />
            Cambia password
          </button>
        </div>
      </div>
      {/* MODALE CAMBIO PASSWORD */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowModal(false)}
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Cambia password</h2>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nuova password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showRepeat ? "text" : "password"}
                  placeholder="Ripeti nuova password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  onClick={() => setShowRepeat((v) => !v)}
                  tabIndex={-1}
                  aria-label={showRepeat ? "Nascondi password" : "Mostra password"}
                >
                  {showRepeat ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODALE AGGIUNTA ENTITÀ */}
      {showAddEntityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowAddEntityModal(false)}
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Aggiungi entità fiscale</h2>
            <form className="flex flex-col gap-4" onSubmit={handleAddEntity}>
              <input
                type="text"
                placeholder="Ragione sociale"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="Partita IVA / CF"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={form.partita_iva}
                onChange={e => setForm(f => ({ ...f, partita_iva: e.target.value }))}
                required
              />
              <select
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={form.tipo}
                onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                required
              >
                {ENTITY_TYPES.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {addEntityError && <div className="text-red-600 text-sm text-center mt-1">{addEntityError}</div>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setShowAddEntityModal(false)}
                  disabled={addEntityLoading}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition"
                  disabled={addEntityLoading}
                >
                  {addEntityLoading ? 'Salvataggio...' : 'Salva'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 4. Modale di modifica entità */}
      {showEditEntityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowEditEntityModal(false)}
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Modifica entità fiscale</h2>
            <form className="flex flex-col gap-4" onSubmit={handleEditEntity}>
              <input
                type="text"
                placeholder="Ragione sociale"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="Partita IVA / CF"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={editForm.partita_iva}
                onChange={e => setEditForm(f => ({ ...f, partita_iva: e.target.value }))}
                required
              />
              <select
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                value={editForm.tipo}
                onChange={e => setEditForm(f => ({ ...f, tipo: e.target.value }))}
                required
              >
                {ENTITY_TYPES.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {editEntityError && <div className="text-red-600 text-sm text-center mt-1">{editEntityError}</div>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setShowEditEntityModal(false)}
                  disabled={editEntityLoading}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition"
                  disabled={editEntityLoading}
                >
                  {editEntityLoading ? 'Salvataggio...' : 'Salva'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Entità fiscali collegate</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
          onClick={() => setShowAddEntityModal(true)}
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Aggiungi entità</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">P.IVA / CF</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {entitiesLoading ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-400">Caricamento entità...</td></tr>
            ) : entities.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nessuna entità collegata</td></tr>
            ) : (
              entities.map((e) => (
                <tr key={e.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-2 font-medium">{e.name}</td>
                  <td className="px-4 py-2 font-mono">{e.body?.partita_iva}</td>
                  <td className="px-4 py-2">{e.body?.tipo}</td>
                  <td className="px-4 py-2">
                    <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-900 text-xs font-semibold hover:bg-gray-300 transition dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleEditClick(e)}>
                      <Info size={16} />
                      <span className="hidden sm:inline">Modifica</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 