"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Funzione per convertire errori Supabase in messaggi user-friendly
function getErrorMessage(error: { message?: string } | null | undefined): string {
  if (!error || !error.message) {
    return 'Si è verificato un errore. Riprova o contatta il supporto.';
  }
  
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('already registered') || errorMessage.includes('email already exists')) {
    return 'Questo indirizzo email è già registrato. Prova ad accedere.';
  }
  
  if (errorMessage.includes('invalid email')) {
    return 'Indirizzo email non valido.';
  }
  
  if (errorMessage.includes('password') && errorMessage.includes('short')) {
    return 'La password deve essere di almeno 6 caratteri.';
  }
  
  if (errorMessage.includes('password') && errorMessage.includes('weak')) {
    return 'La password è troppo debole. Usa lettere, numeri e simboli.';
  }
  
  if (errorMessage.includes('signup') && errorMessage.includes('disabled')) {
    return 'Le registrazioni sono temporaneamente disabilitate.';
  }
  
  return 'Si è verificato un errore durante la registrazione. Riprova.';
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    
    const form = e.currentTarget;
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const repeat = (form.elements.namedItem("repeat") as HTMLInputElement).value;
    
    // Validazione base
    if (!nome || !email || !password || !repeat) {
      setError('Tutti i campi sono obbligatori.');
      setLoading(false);
      return;
    }
    
    if (password !== repeat) {
      setError("Le password non coincidono.");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri.");
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { nome },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        },
      });
      
      if (error) {
        setError(getErrorMessage(error));
      } else if (data.user) {
        setSuccess(true);
        // Redirect dopo 3 secondi per dare tempo di leggere il messaggio
        setTimeout(() => {
          router.push("/richieste");
        }, 3000);
      }
    } catch (err) {
      console.error('Errore imprevisto durante la registrazione:', err);
      setError('Si è verificato un errore imprevisto. Riprova.');
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-4">
      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Registrati</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            name="nome" 
            type="text" 
            placeholder="Nome" 
            className="px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition" 
            disabled={loading}
            autoComplete="given-name"
            required
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition" 
            disabled={loading}
            autoComplete="email"
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition pr-10"
              disabled={loading}
              autoComplete="new-password"
              required
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
              name="repeat"
              type={showRepeat ? "text" : "password"}
              placeholder="Ripeti password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition pr-10"
              disabled={loading}
              autoComplete="new-password"
              required
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
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 px-4 py-3 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            {loading ? 'Registrazione...' : 'Registrati'}
          </button>
          {error && (
            <div className="text-red-600 text-sm text-center mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center mt-1 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              Registrazione avvenuta! Controlla la tua email per confermare. Reindirizzamento in corso...
            </div>
          )}
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Hai già un account?{' '}
          <Link href="/auth/login" className="underline hover:text-gray-900 dark:hover:text-white font-semibold">Accedi</Link>
        </p>
      </div>
    </div>
  );
} 