"use client";
import React, { useState } from "react";
import { Plus, Info, KeyRound, Eye, EyeOff, X } from "lucide-react";

// Mock dati utente
const user = {
  nome: "Mario Rossi",
  email: "mario.rossi@email.it",
};

// Mock entità fiscali
const entita = [
  { id: 1, nome: "Alfa Srl", piva: "12345678901", tipo: "SRL" },
  { id: 2, nome: "Mario Rossi", piva: "RSSMRA80A01H501Z", tipo: "Persona Fisica" },
];

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  return (
    <div className="p-4 sm:p-8 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profilo</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
            <div>
              <span className="block text-gray-500 dark:text-gray-400 text-xs">Nome</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{user.nome}</span>
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Entità fiscali collegate</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all">
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
            {entita.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 font-medium">{e.nome}</td>
                <td className="px-4 py-2 font-mono">{e.piva}</td>
                <td className="px-4 py-2">{e.tipo}</td>
                <td className="px-4 py-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-900 text-xs font-semibold hover:bg-gray-300 transition dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
                    <Info size={16} />
                    <span className="hidden sm:inline">Dettagli</span>
                  </button>
                </td>
              </tr>
            ))}
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