
import React, { useState, useEffect } from 'react';
import { Section } from './types';
import HistorySection from './components/HistorySection';
import PlaceValueChart from './components/PlaceValueChart';
import CompositionTool from './components/CompositionTool';
import Quiz from './components/Quiz';

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
    { id: Section.History, label: 'História', icon: '📜' },
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
          
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-400 transition-colors px-4 py-2 rounded-lg text-sm font-semibold border border-indigo-400"
          >
            <span>{isFullscreen ? "Sair Tela Cheia" : "Tela Cheia"}</span>
          </button>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-0 z-10 shadow-sm overflow-x-auto">
        <div className="container mx-auto flex justify-center py-2 px-4 space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-3 md:px-5 py-2 rounded-full transition-all text-sm font-medium whitespace-nowrap
                ${activeSection === item.id 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span>{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] border border-gray-100">
          {renderSection()}
        </div>
      </main>

      <footer className="bg-gray-100 border-t py-4 text-center text-gray-500 text-xs">
        <p>© 2024 Mestre dos Números - Plataforma Interativa</p>
      </footer>
    </div>
  );
};

export default App;
