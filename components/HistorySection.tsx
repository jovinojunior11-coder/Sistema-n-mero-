
import React, { useState } from 'react';
import { HISTORICAL_SYSTEMS } from '../constants';

const HistorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(HISTORICAL_SYSTEMS[0].id);
  const selectedSystem = HISTORICAL_SYSTEMS.find(s => s.id === selectedId) || HISTORICAL_SYSTEMS[0];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">📜</span> Sistemas de Numeração na História
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Ao longo da história, a humanidade criou diferentes sistemas para representar quantidades e realizar cálculos.
          Conheça os principais sistemas que moldaram a matemática:
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {HISTORICAL_SYSTEMS.map(system => (
            <button
              key={system.id}
              onClick={() => setSelectedId(system.id)}
              className={`p-4 rounded-2xl border-2 transition-all text-left
                ${selectedId === system.id 
                  ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-200 animate-pop' 
                  : 'border-gray-100 hover:border-indigo-200 bg-white hover:scale-[1.02]'}`}
            >
              <div className="font-bold text-gray-800 mb-1">{system.name}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{system.description}</div>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">Sistema {selectedSystem.name}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                {selectedSystem.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-600 uppercase text-xs tracking-wider">Principais Símbolos:</h4>
                <div className="flex flex-wrap gap-4">
                  {selectedSystem.symbols.map((s, idx) => (
                    <div key={idx} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                      <span className="text-4xl mb-2 font-serif text-indigo-900">{s.char}</span>
                      <span className="text-xs font-bold text-gray-400">Valor {s.val}</span>
                      {s.svg && <span className="text-[10px] text-indigo-400 mt-1 uppercase">{s.svg}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block w-48 h-48 bg-white rounded-full flex items-center justify-center border-4 border-indigo-100 shadow-inner">
               <span className="text-6xl grayscale opacity-40">🏛️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
