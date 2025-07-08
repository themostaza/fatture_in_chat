import React from "react";
import { Plus, FilePlus, Info } from "lucide-react";

const clienti = [
  { id: 1, nome: "Alfa Srl", piva: "12345678901", email: "info@alfasrl.it" },
  { id: 2, nome: "Beta Spa", piva: "98765432109", email: "contatti@betaspa.it" },
  { id: 3, nome: "Gamma Srl", piva: "11223344556", email: "amministrazione@gammasrl.it" },
];

export default function ClientiPage() {
  return (
    <div className="p-4 sm:p-8 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clienti</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all">
          <Plus size={18} />
          <span className="hidden sm:inline">Aggiungi cliente</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">P.IVA</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {clienti.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 font-medium">{c.nome}</td>
                <td className="px-4 py-2 font-mono">{c.piva}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition">
                    <FilePlus size={16} />
                    <span className="hidden sm:inline">Nuova richiesta</span>
                  </button>
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
    </div>
  );
} 