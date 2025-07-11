"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/client";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        router.replace("/richieste");
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/richieste");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-4">
      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Accedi</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
          <input name="email" type="email" placeholder="Email" className="px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition" disabled={loading} />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition pr-10"
              disabled={loading}
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
          <button type="submit" disabled={loading} className="mt-2 px-4 py-3 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all flex items-center justify-center">
            {loading ? <span className="loader mr-2" /> : null}
            Accedi
          </button>
          {error && <div className="text-red-600 text-sm text-center mt-1">{error}</div>}
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Non hai un account?{' '}
          <Link href="/auth/register" className="underline hover:text-gray-900 dark:hover:text-white font-semibold">Registrati</Link>
        </p>
      </div>
      <style jsx>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #333;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 