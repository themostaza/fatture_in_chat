import Link from "next/link";
import { Building, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans">
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6">
        {/* Prima riga: logo a sx, accedi a dx (mobile), accedi+chatta a dx (desktop) */}
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold tracking-tight">fatture in chat</span>
          {/* Desktop: accedi + chatta con l'AI paralleli; Mobile: solo accedi */}
          <div className="flex gap-3">
            <Link href="/auth/login" className="px-5 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:scale-105 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200">Accedi</Link>
            <Link href="/chat" className="hidden sm:inline-block px-5 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold shadow-lg border-2 border-gray-900 dark:border-gray-100 hover:scale-110 hover:from-gray-900 hover:to-gray-700 transition-all duration-200 animate-pulse">Chatta con l&apos;AI</Link>
          </div>
        </div>
        {/* Mobile only: Chatta con l'AI sotto, a larghezza intera */}
        <div className="block sm:hidden mt-3 w-full">
          <Link href="/chat" className="block w-full px-5 py-3 rounded-md bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold shadow-lg border-2 border-gray-900 dark:border-gray-100 hover:scale-105 hover:from-gray-900 hover:to-gray-700 transition-all duration-200 animate-pulse text-center">Chatta con l&apos;AI</Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          La fatturazione <span className="text-gray-500 dark:text-gray-300">senza stress</span><br />
          tra azienda e commercialista
        </h1>
        <p className="max-w-xl text-lg sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          L&apos;intelligenza artificiale che semplifica la comunicazione tra aziende e commercialisti.<br />
          <span className="block my-4 px-4 py-3 rounded-md bg-amber-300 text-gray-900 font-semibold text-base sm:text-lg shadow-md">
            Dì all&apos;AI cosa vuoi fatturare, a chi e come: penserà a tutto lei.
          </span>
          Il commercialista riceve solo dati completi, pronti per la fattura.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md">
          <Link href="/aziende" className="flex-1 px-6 py-3 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold text-lg shadow hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-2">
            <Building size={22} className="inline-block" />
            Per le aziende
          </Link>
          <Link href="/commercialisti" className="flex-1 px-6 py-3 rounded-md border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-2">
            <Briefcase size={22} className="inline-block" />
            Per commercialisti
          </Link>
        </div>
      </main>
      <footer className="w-full text-center py-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} fatture in chat. Made with ❤️ in Italy.
      </footer>
    </div>
  );
}
