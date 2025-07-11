"use client";
import Link from "next/link";
import Image from "next/image";
import { Building, Briefcase, CheckCircle, Users, MessageCircle, Share2, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans">
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6">
        {/* Prima riga: logo a sx, accedi a dx (mobile), accedi+chatta a dx (desktop) */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Image 
              src="/favicon.ico" 
              alt="favicon" 
              width={28} 
              height={28}
              className="w-7 h-7"
            />
            <span className="text-2xl font-bold tracking-tight">fatture in chat</span>
          </div>
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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-2xl">
          <a href="#aziende" className="flex-1 px-6 py-3 sm:px-8 sm:py-4 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold text-lg shadow hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-2">
            <Building size={22} className="inline-block" />
            Per le aziende
          </a>
          <a href="#commercialisti" className="flex-1 px-6 py-3 sm:px-8 sm:py-4 rounded-md border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-2">
            <Briefcase size={22} className="inline-block" />
            Per i commercialisti
          </a>
        </div>
      </main>
      
      {/* Sezione per le aziende */}
      <section id="aziende" className="w-full bg-white dark:bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Building className="w-12 h-12 mx-auto mb-4 text-gray-800 dark:text-gray-200" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Per le aziende
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Semplificate la vostra contabilità con l&apos;intelligenza artificiale
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Comunicazione naturale
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Descrivete le vostre transazioni in linguaggio naturale, l&apos;AI si occupa del resto
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Dati sempre completi
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tutte le informazioni necessarie vengono raccolte automaticamente per la fatturazione
              </p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Collaborazione fluida
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Il vostro commercialista riceve dati strutturati e pronti per l&apos;elaborazione
              </p>
            </div>
          </div>
          
          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              costi chiari.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">€20</span> al mese
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Utenti illimitati • Chat illimitate • Supporto incluso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200">
                Inizia subito
              </Link>
              <Link href="/pricing" className="px-8 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                Pricing completo
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sezione per i commercialisti */}
      <section id="commercialisti" className="w-full bg-gray-50 dark:bg-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-800 dark:text-gray-200" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Per i commercialisti
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Offrite un servizio innovativo ai vostri clienti con tariffe agevolate
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Servizio ai clienti
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Offrite fatture in chat direttamente ai vostri clienti</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Ricevete dati già strutturati e verificati dall&apos;AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Riducete i tempi di elaborazione e gli errori</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Tariffe agevolate
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Sconti progressivi in base al numero di clienti</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Piani personalizzati per studi e associazioni</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Supporto dedicato per la migrazione</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Scoprite le nostre offerte
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Contattateci per un preventivo personalizzato basato sulle vostre esigenze
            </p>
            <button className="px-8 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 mx-auto">
             Contatta il team di vendita
            </button>
          </div>
        </div>
      </section>
      
      {/* Sezione condivisione */}
      <section className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Ti piace quello che vedi?
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Aiutaci a far conoscere fatture in chat! Condividi questa pagina con altri imprenditori e commercialisti che potrebbero trarne beneficio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'fatture in chat - La fatturazione senza stress',
                    text: 'Scopri come semplificare la comunicazione tra aziende e commercialisti con l\'AI',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiato negli appunti!');
                }
              }}
              className="px-6 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Condividi questa pagina
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Ogni condivisione ci aiuta a crescere 🚀
            </span>
          </div>
        </div>
      </section>
      
      <footer className="w-full text-center py-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} fatture in chat. Made with ❤️ in Italy.
      </footer>
    </div>
  );
}
