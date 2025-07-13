"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Funzione per convertire errori Supabase in messaggi user-friendly
function getErrorMessage(error: { message?: string } | null | undefined): string {
  // Controllo di sicurezza per evitare errori se message è undefined
  if (!error || !error.message) {
    return 'Si è verificato un errore. Riprova o contatta il supporto.';
  }
  
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('invalid login credentials') || 
      errorMessage.includes('invalid email or password') ||
      errorMessage.includes('email not confirmed')) {
    return 'Email o password non corretti. Riprova.';
  }
  
  if (errorMessage.includes('too many requests')) {
    return 'Troppi tentativi di accesso. Riprova tra qualche minuto.';
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('connection')) {
    return 'Problema di connessione. Controlla la tua connessione internet.';
  }
  
  if (errorMessage.includes('email') && errorMessage.includes('invalid')) {
    return 'Indirizzo email non valido.';
  }
  
  if (errorMessage.includes('password') && errorMessage.includes('short')) {
    return 'La password deve essere di almeno 6 caratteri.';
  }
  
  // Errore generico per casi non previsti
  return 'Si è verificato un errore. Riprova o contatta il supporto.';
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    // Validazione base
    if (!email || !password) {
      setError('Email e password sono obbligatori.');
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        setError(getErrorMessage(error));
      } else if (data.user) {
        // Usa Next.js router invece di window.location per evitare problemi
        const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/richieste';
        router.push(returnTo);
        router.refresh(); // Refresh per aggiornare la sessione
      }
    } catch (err) {
      console.error('Errore imprevisto durante il login:', err);
      setError('Si è verificato un errore imprevisto. Riprova.');
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-4">
      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Accedi</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
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
          <div className="flex justify-end -mt-2 mb-2">
            <Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-white font-semibold">Password dimenticata?</Link>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 px-4 py-3 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
          {error && (
            <div className="text-red-600 text-sm text-center mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Non hai un account?{' '}
          <Link href="/auth/register" className="underline hover:text-gray-900 dark:hover:text-white font-semibold">Registrati</Link>
        </p>
      </div>
    </div>
  );
} 