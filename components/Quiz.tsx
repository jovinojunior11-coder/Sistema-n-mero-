
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants.tsx';
import { QuizQuestion } from '../types.ts';

const Quiz: React.FC = () => {
  const [localQuestions, setLocalQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);
  
  // State for adding new questions
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState(true);

  const currentQuestion = localQuestions[currentIndex];

  const toggleAnswer = (id: number, val: boolean) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const calculateScore = () => {
    let score = 0;
    localQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const isComplete = localQuestions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

  const handleNext = () => {
    if (currentIndex < localQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: QuizQuestion = {
      id: Date.now(), // Unique ID
      question: newQuestionText,
      correctAnswer: newQuestionAnswer
    };

    setLocalQuestions(prev => [...prev, newQ]);
    setNewQuestionText('');
    setIsAdding(false);
  };

  const resetQuiz = () => {
    setShowResults(false);
    setAnswers({});
    setCurrentIndex(0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto bg-indigo-50 p-10 rounded-3xl border-2 border-indigo-200 text-center animate-in zoom-in duration-500">
          <div className="text-6xl mb-4">
            {score === localQuestions.length ? '🏆' : '⭐'}
          </div>
          <h3 className="text-3xl font-bold text-indigo-700 mb-2">Seu Resultado</h3>
          <div className="text-7xl font-black text-indigo-800 mb-4">
            {score} / {localQuestions.length}
          </div>
          <p className="text-indigo-600 mb-8 text-xl font-medium">
            {score === localQuestions.length 
              ? 'Incrível! Você é um Mestre dos Números!' 
              : 'Bom trabalho! O conhecimento é uma jornada contínua.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              Recomeçar Quiz
            </button>
            <button
              onClick={() => {
                resetQuiz();
                setLocalQuestions(QUIZ_QUESTIONS);
              }}
              className="px-10 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-sm"
            >
              Resetar Questões Padrão
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header and Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="mr-3">📝</span> Praticar
            </h2>
            <p className="text-gray-500 mt-1">Questão {currentIndex + 1} de {localQuestions.length}</p>
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-all font-semibold shadow-sm text-sm"
          >
            <span>{isAdding ? '✕ Cancelar' : '+ Adicionar Pergunta'}</span>
          </button>
        </div>

        {/* Add Question Form */}
        {isAdding && (
          <div className="mb-8 bg-emerald-50 border-2 border-emerald-100 p-6 rounded-3xl animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-bold text-emerald-800 mb-4">Criar Nova Afirmação</h3>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <textarea
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Ex: No número 10, o algarismo 1 representa uma dezena."
                className="w-full p-4 rounded-xl border-2 border-emerald-200 focus:outline-none focus:border-emerald-500 transition-all text-gray-700"
                rows={2}
                required
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-emerald-700">Resposta Correta:</span>
                  <div className="flex bg-white rounded-lg border border-emerald-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setNewQuestionAnswer(true)}
                      className={`px-4 py-2 text-xs font-bold transition-all ${newQuestionAnswer ? 'bg-emerald-500 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}
                    >
                      VERDADEIRO
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewQuestionAnswer(false)}
                      className={`px-4 py-2 text-xs font-bold transition-all ${!newQuestionAnswer ? 'bg-emerald-500 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}
                    >
                      FALSO
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md"
                >
                  Salvar Questão
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full mb-10 overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / localQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl p-8 md:p-12 mb-8 min-h-[300px] flex flex-col justify-center animate-in fade-in duration-500 relative">
          <div className="absolute top-6 left-8 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Afirmação
          </div>
          
          <p className="text-2xl md:text-3xl font-medium text-gray-800 text-center leading-relaxed">
            "{currentQuestion.question}"
          </p>

          <div className="mt-12 flex justify-center space-x-6">
            <button
              onClick={() => toggleAnswer(currentQuestion.id, true)}
              className={`group flex flex-col items-center gap-2 p-6 rounded-3xl transition-all border-4 w-32 md:w-40
                ${answers[currentQuestion.id] === true 
                  ? 'bg-indigo-600 border-indigo-200 text-white scale-105 shadow-xl' 
                  : 'bg-white border-transparent hover:border-indigo-100 text-gray-400'}`}
            >
              <span className="text-4xl md:text-5xl font-black">V</span>
              <span className="text-xs font-bold uppercase tracking-widest">Verdadeiro</span>
            </button>
            
            <button
              onClick={() => toggleAnswer(currentQuestion.id, false)}
              className={`group flex flex-col items-center gap-2 p-6 rounded-3xl transition-all border-4 w-32 md:w-40
                ${answers[currentQuestion.id] === false 
                  ? 'bg-indigo-600 border-indigo-200 text-white scale-105 shadow-xl' 
                  : 'bg-white border-transparent hover:border-indigo-100 text-gray-400'}`}
            >
              <span className="text-4xl md:text-5xl font-black">F</span>
              <span className="text-xs font-bold uppercase tracking-widest">Falso</span>
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all
              ${currentIndex === 0 
                ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                : 'text-indigo-600 bg-white border-2 border-indigo-100 hover:bg-indigo-50 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Anterior</span>
          </button>

          {currentIndex === localQuestions.length - 1 ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`flex-grow px-8 py-4 rounded-2xl font-black text-lg shadow-lg transition-all text-center
                ${isComplete 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Finalizar e Ver Resultado
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              <span>Próxima</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
