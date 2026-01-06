
import React, { useState, useEffect } from 'react';
import { Section } from './types.ts';
import HistorySection from './components/HistorySection.tsx';
import PlaceValueChart from './components/PlaceValueChart.tsx';
import CompositionTool from './components/CompositionTool.tsx';
import Quiz from './components/Quiz.tsx';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.History);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Erro ao tentar ativar tela cheia: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case Section.History:
        return <HistorySection />;
      case Section.PlaceValue:
        return <PlaceValueChart />;
      case Section.Composition:
        return <CompositionTool />;
      case Section.Quiz:
        return <Quiz />;
      default:
        return <HistorySection />;
    }
  };

  const navItems = [
    { id: Section.History, label: 'Sistemas Históricos', icon: '📜' },
    { id: Section.PlaceValue, label: 'Ordens e Classes', icon: '📊' },
    { id: Section.Composition, label: 'Decomposição', icon: '🧩' },
    { id: Section.Quiz, label: 'Exercícios', icon: '📝' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-indigo-600 text-white p-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white text-indigo-600 p-2 rounded-xl text-2xl font-bold shadow-sm">123</div>
            <h1 className="text-2xl font-bold tracking-tight">Mestre dos Números</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <p className="text-indigo-100 text-sm italic hidden sm:block">"Capítulo 1 - Sistemas de Numeração"</p>
            <button
              onClick={toggleFullscreen}
              className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-400 transition-colors px-4 py-2 rounded-lg text-sm font-semibold border border-indigo-400 shadow-sm"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
              {isFullscreen ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 011 1v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4a1 1 0 011-1zm13 1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden xs:inline">Sair Tela Cheia</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4v-4m0 4h-4m4 0l-4-4" />
                  </svg>
                  <span className="hidden xs:inline">Tela Cheia</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-0 z-10 shadow-sm overflow-x-auto">
        <div className="container mx-auto flex justify-center py-2 px-4 space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all text-sm font-medium whitespace-nowrap
                ${activeSection === item.id 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] border border-gray-100">
          {renderSection()}
        </div>
      </main>

      <footer className="bg-gray-100 border-t py-6 text-center text-gray-500 text-sm">
        <p>© 2024 Portal Educativo - Sistema de Numeração Interativo</p>
      </footer>
    </div>
  );
};

export default App;
