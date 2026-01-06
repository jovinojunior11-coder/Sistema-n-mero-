
import React, { useState } from 'react';

const CompositionTool: React.FC = () => {
  const [num, setNum] = useState<number>(43250);

  const getDecomposition = (val: number) => {
    const s = val.toString();
    const parts: string[] = [];
    for (let i = 0; i < s.length; i++) {
      const digit = parseInt(s[i]);
      if (digit !== 0) {
        const power = s.length - 1 - i;
        parts.push((digit * Math.pow(10, power)).toLocaleString('pt-BR'));
      }
    }
    return parts;
  };

  const decomposition = getDecomposition(num);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">🧩</span> Composição e Decomposição
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          <strong>Composição</strong> é formar um número através da soma dos valores posicionais.<br/>
          <strong>Decomposição</strong> consiste em escrever o número como a soma do valor de cada ordem.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Controls */}
          <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Ajuste o número:</h3>
            <input 
              type="range" 
              min="1" 
              max="100000" 
              value={num} 
              onChange={(e) => setNum(parseInt(e.target.value))}
              className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer mb-6"
            />
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-gray-500 font-medium">Valor Selecionado:</span>
              <span className="text-3xl font-black text-indigo-600 tracking-tight">
                {num.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[123, 432, 1005, 43250, 60582, 100000].map(v => (
                <button 
                  key={v}
                  onClick={() => setNum(v)}
                  className="px-2 py-2 text-xs font-bold bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Area */}
          <div className="space-y-6">
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-xs uppercase font-bold tracking-widest opacity-70 mb-2">Composição</div>
              <div className="text-lg md:text-xl font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
                {decomposition.join(' + ')} = <span className="font-black underline decoration-4 underline-offset-8 decoration-indigo-300">{num.toLocaleString('pt-BR')}</span>
              </div>
            </div>

            <div className="bg-emerald-500 p-8 rounded-3xl text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-xs uppercase font-bold tracking-widest opacity-70 mb-2">Decomposição</div>
              <div className="text-xl md:text-2xl font-black">
                {num.toLocaleString('pt-BR')} =
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {decomposition.map((part, i) => (
                  <div key={i} className="flex items-center">
                    <span className="bg-white/20 px-3 py-1 rounded-lg font-bold">{part}</span>
                    {i < decomposition.length - 1 && <span className="mx-2 font-bold">+</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
           <div className="flex items-center space-x-4">
              <div className="text-4xl">💡</div>
              <div>
                <h4 className="font-bold text-yellow-800">Dica do Professor</h4>
                <p className="text-yellow-700 text-sm">
                  Repare como cada zero adicionado na decomposição representa uma potência de dez (uma ordem diferente). 
                  Isso é o que chamamos de <strong>Sistema Posicional</strong>!
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompositionTool;
