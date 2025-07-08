import React from "react";
import { FilePlus } from "lucide-react";

const kpiData = [
  { label: "Totali", value: 32 },
  { label: "In attesa", value: 7 },
  { label: "Approvate", value: 21 },
  { label: "Rifiutate", value: 4 },
];

const richieste = [
  { id: 1, azienda: "Alfa Srl", oggetto: "Fattura consulenza", stato: "In attesa", data: "2024-06-01" },
  { id: 2, azienda: "Beta Spa", oggetto: "Fattura servizi", stato: "Approvata", data: "2024-05-28" },
  { id: 3, azienda: "Gamma Srl", oggetto: "Fattura prodotti", stato: "Rifiutata", data: "2024-05-25" },
  { id: 4, azienda: "Delta Srl", oggetto: "Fattura manutenzione", stato: "Approvata", data: "2024-05-20" },
];

export default function RichiestePage() {
  return (
    <div className="p-4 sm:p-8 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Richieste di fatturazione</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold shadow hover:bg-gray-700 dark:hover:bg-gray-200 transition-all">
          <FilePlus size={18} />
          <span className="hidden sm:inline">Nuova richiesta</span>
        </button>
      </div>
      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{kpi.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kpi.label}</span>
          </div>
        ))}
      </div>
      {/* Tabella */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Azienda</th>
              <th className="px-4 py-2 text-left">Oggetto</th>
              <th className="px-4 py-2 text-left">Stato</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {richieste.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 font-mono">{r.id}</td>
                <td className="px-4 py-2">{r.azienda}</td>
                <td className="px-4 py-2">{r.oggetto}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold 
                    ${r.stato === "Approvata" ? "bg-green-200 text-green-800" : ""}
                    ${r.stato === "Rifiutata" ? "bg-red-200 text-red-800" : ""}
                    ${r.stato === "In attesa" ? "bg-yellow-200 text-yellow-800" : ""}
                  `}>
                    {r.stato}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{r.data}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 rounded bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition">Dettagli</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 