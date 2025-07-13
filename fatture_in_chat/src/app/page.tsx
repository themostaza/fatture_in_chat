"use client";
import Link from "next/link";
import Image from "next/image";
import { Building, Briefcase, CheckCircle, Users, MessageCircle, Share2, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-system">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/favicon.ico" 
                alt="favicon" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-medium">fatture in chat</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Accedi
              </Link>
              <Link href="/chat" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-medium">
                Chatta con l&apos;AI
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-thin tracking-tight leading-tight mb-8">
            La fatturazione <span className="text-gray-400">senza stress</span><br />
            tra azienda e commercialista
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            L&apos;intelligenza artificiale che semplifica la comunicazione tra aziende e commercialisti.
          </p>
          
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Dì all&apos;AI cosa vuoi fatturare, a chi e come: penserà a tutto lei.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
              Il commercialista riceve solo dati completi, pronti per la fattura.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#aziende" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
              <Building size={20} />
              Per le aziende
            </a>
            <a href="#commercialisti" className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 flex items-center gap-2">
              <Briefcase size={20} />
              Per i commercialisti
            </a>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium mb-4">
              Una conversazione reale con la nostra AI
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Messaggio AI */}
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl rounded-tl-lg px-6 py-4 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Fatture in Chat</span>
                  </div>
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    <span className="font-medium">Cosa vuoi fatturare?</span><br />
                    Scrivimi i dettagli della fattura
                  </p>
                </div>
              </div>
              
              {/* Messaggio Utente */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-3xl rounded-tr-lg px-6 py-4 max-w-[80%]">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-xs font-medium text-blue-100">Tu</span>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  </div>
                  <p className="leading-relaxed">
                    fattura su Larin Srl euro 2580 € per Lavori manutenzione arredamento sede
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Dati raccolti e inviati al commercialista
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione per le aziende */}
      <section id="aziende" className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Building className="w-12 h-12 mx-auto mb-6 text-gray-400" />
            <h2 className="text-4xl sm:text-5xl font-thin text-gray-900 dark:text-white mb-6">
              Per le aziende
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Semplifica la tua contabilità con l&apos;intelligenza artificiale
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Comunicazione naturale
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Descrivi le tue transazioni in linguaggio naturale, l&apos;AI si occupa del resto
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <CheckCircle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Dati sempre completi
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tutte le informazioni necessarie vengono raccolte automaticamente per la fatturazione
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <Users className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Collaborazione fluida
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Il tuo commercialista riceve dati strutturati e pronti per l&apos;elaborazione
              </p>
            </div>
          </div>
          
          <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-3xl p-12">
            <h3 className="text-3xl font-thin text-gray-900 dark:text-white mb-6">
              costi chiari.
            </h3>
            <div className="mb-8">
              <span className="text-5xl font-thin text-gray-900 dark:text-white">€20</span>
              <span className="text-xl text-gray-600 dark:text-gray-400 ml-2">al mese</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Utenti illimitati • Chat illimitate • Supporto incluso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
                Inizia subito
              </Link>
              <Link href="/pricing" className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200">
                Pricing completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione per i commercialisti */}
      <section id="commercialisti" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Briefcase className="w-12 h-12 mx-auto mb-6 text-gray-400" />
            <h2 className="text-4xl sm:text-5xl font-thin text-gray-900 dark:text-white mb-6">
              Per i commercialisti
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Offri un servizio innovativo ai tuoi clienti con tariffe agevolate
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
                Servizio ai clienti
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Offri fatture in chat direttamente ai tuoi clienti</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ricevi dati già strutturati e verificati dall&apos;AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Riduci i tempi di elaborazione e gli errori</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
                Tariffe agevolate
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Sconti progressivi in base al numero di clienti</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Piani personalizzati per studi e associazioni</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supporto dedicato per la migrazione</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-gray-800 rounded-3xl p-12">
            <h3 className="text-3xl font-thin text-gray-900 dark:text-white mb-6">
              Scopri le nostre offerte
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Contattaci per un preventivo personalizzato basato sulle tue esigenze
            </p>
            <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
              Contatta il team di vendita
            </button>
          </div>
        </div>
      </section>

      {/* Sezione condivisione */}
      <section className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl sm:text-4xl font-thin text-gray-900 dark:text-white">
              Ti piace quello che vedi?
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
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
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
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

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} fatture in chat. Made with ❤️ in Italy.
          </p>
        </div>
      </footer>
    </div>
  );
}
