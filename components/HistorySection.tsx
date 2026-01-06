
import React, { useState } from 'react';
import { HISTORICAL_SYSTEMS } from '../constants';

const HistorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(HISTORICAL_SYSTEMS[0].id);
  const selectedSystem = HISTORICAL_SYSTEMS.find(s => s.id === selectedId) || HISTORICAL_SYSTEMS[0];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">📜</span> Sistemas na História
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {HISTORICAL_SYSTEMS.map(system => (
            <button
              key={system.id}
              onClick={() => setSelectedId(system.id)}
              className={`p-3 rounded-2xl border-2 transition-all text-center
                ${selectedId === system.id 
                  ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105 font-bold text-indigo-700' 
                  : 'border-gray-100 hover:border-indigo-100 bg-white text-gray-600'}`}
            >
              {system.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 animate-in fade-in duration-500">
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">{selectedSystem.name}</h3>
          <p className="text-gray-600 mb-8 italic">{selectedSystem.description}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {selectedSystem.symbols.map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                <span className="text-4xl mb-2 font-serif text-indigo-900">{s.char}</span>
                <span className="text-xs font-black text-indigo-400">VALOR {s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
