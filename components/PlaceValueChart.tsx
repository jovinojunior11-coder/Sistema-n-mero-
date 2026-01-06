
import React, { useState, useEffect } from 'react';

const PlaceValueChart: React.FC = () => {
  const [number, setNumber] = useState<string>('602301');

  // Split number into digits, pad with zeros to fill classes if needed
  const getDigits = () => {
    const clean = number.replace(/\D/g, '').substring(0, 9);
    return clean.padStart(9, ' ').split('');
  };

  const digits = getDigits();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 9) {
      setNumber(val);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">📊</span> Ordens e Classes
        </h2>
        
        <div className="mb-8 p-6 bg-indigo-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-100">
          <div>
            <h3 className="text-lg font-bold text-indigo-800 mb-2">Digite um número para explorar:</h3>
            <p className="text-indigo-600 text-sm italic">Experimente números de 1 a 999.999.999</p>
          </div>
          <input
            type="text"
            value={number}
            onChange={handleInputChange}
            className="text-4xl font-bold tracking-widest text-indigo-700 bg-white border-2 border-indigo-300 rounded-xl px-6 py-3 w-full md:w-64 text-center focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all shadow-sm"
            placeholder="0"
          />
        </div>

        {/* The Table */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead>
              {/* Classes Row */}
              <tr className="text-white">
                <th colSpan={3} className="bg-emerald-500 py-3 border-r border-emerald-600 font-bold">Classe dos Milhões</th>
                <th colSpan={3} className="bg-yellow-500 py-3 border-r border-yellow-600 font-bold">Classe dos Milhares</th>
                <th colSpan={3} className="bg-rose-500 py-3 font-bold">Classe das Unidades Simples</th>
              </tr>
              {/* Header Abbreviations */}
              <tr className="bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 border-r border-gray-200 w-[11%]">CMi</th>
                <th className="py-3 border-r border-gray-200 w-[11%]">DMi</th>
                <th className="py-3 border-r border-gray-200 w-[11%]">UMi</th>
                
                <th className="py-3 border-r border-gray-200 w-[11%]">CM</th>
                <th className="py-3 border-r border-gray-200 w-[11%]">DM</th>
                <th className="py-3 border-r border-gray-200 w-[11%]">UM</th>
                
                <th className="py-3 border-r border-gray-200 w-[11%]">C</th>
                <th className="py-3 border-r border-gray-200 w-[11%]">D</th>
                <th className="py-3 w-[11%]">U</th>
              </tr>
              {/* Full Names */}
              <tr className="bg-white text-gray-400 text-[10px] uppercase border-b border-gray-100">
                <th className="py-2 px-1 border-r border-gray-200">Centena de Milhão</th>
                <th className="py-2 px-1 border-r border-gray-200">Dezena de Milhão</th>
                <th className="py-2 px-1 border-r border-gray-200">Unidade de Milhão</th>
                
                <th className="py-2 px-1 border-r border-gray-200">Centena de Milhar</th>
                <th className="py-2 px-1 border-r border-gray-200">Dezena de Milhar</th>
                <th className="py-2 px-1 border-r border-gray-200">Unidade de Milhar</th>
                
                <th className="py-2 px-1 border-r border-gray-200">Centena</th>
                <th className="py-2 px-1 border-r border-gray-200">Dezena</th>
                <th className="py-2 px-1">Unidade</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white h-24">
                {digits.map((digit, idx) => (
                  <td 
                    key={idx} 
                    className={`border border-gray-100 text-center text-5xl font-black transition-all duration-300
                    ${digit !== ' ' ? 'text-gray-800 scale-110' : 'text-gray-100'}
                    ${idx < 3 ? 'bg-emerald-50' : idx < 6 ? 'bg-yellow-50' : 'bg-rose-50'}`}
                  >
                    {digit === ' ' ? '0' : digit}
                  </td>
                ))}
              </tr>
              {/* Order Labels */}
              <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase font-bold text-center">
                {Array.from({length: 9}).map((_, i) => (
                  <td key={i} className="py-2 border-r border-gray-200 last:border-r-0">
                    {9-i}ª Ordem
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4 flex items-center">
              <span className="text-indigo-500 mr-2">📌</span> Resumo de Regras
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span><strong>Decimal:</strong> Os agrupamentos são feitos de 10 em 10.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span><strong>Posicional:</strong> O valor do algarismo depende de sua posição.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span><strong>Classes:</strong> Três ordens formam uma classe. Contamos sempre da direita para a esquerda.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center italic text-gray-500 text-center">
            "A ordem define o poder do dígito. Um '1' na casa das centenas vale cem vezes mais que um '1' na casa das unidades."
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceValueChart;
