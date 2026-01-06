
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [localQuestions, setLocalQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Interface para adicionar perguntas
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState(true);

  const currentQuestion = localQuestions[currentIndex];

  const handleAnswer = (val: boolean) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    
    // Pequeno delay para passar para a próxima automaticamente se for a primeira vez respondendo
    if (answers[currentQuestion.id] === undefined && currentIndex < localQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(idx => idx + 1), 600);
    }
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
      id: Date.now(),
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
      <div className="p-8 animate-in fade-in zoom-in duration-500">
        <div className="max-w-2xl mx-auto bg-indigo-50 p-12 rounded-[3rem] border-4 border-indigo-200 text-center shadow-2xl">
          <div className="text-8xl mb-6">
            {score === localQuestions.length ? '🏆' : '⭐'}
          </div>
          <h3 className="text-4xl font-black text-indigo-700 mb-2">Quiz Finalizado!</h3>
          <div className="text-7xl font-black text-indigo-900 my-8">
            {score} <span className="text-3xl text-indigo-400">/ {localQuestions.length}</span>
          </div>
          <p className="text-indigo-600 mb-10 text-xl font-medium">
            {score === localQuestions.length 
              ? 'Incrível! Você dominou o sistema decimal!' 
              : 'Bom trabalho! Continue praticando para se tornar um mestre.'}
          </p>
          <button
            onClick={resetQuiz}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Praticar</h2>
            <p className="text-gray-400 font-medium">Pergunta {currentIndex + 1} de {localQuestions.length}</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`p-3 rounded-2xl transition-all shadow-md flex items-center gap-2 font-bold
              ${isAdding ? 'bg-rose-100 text-rose-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
          >
            {isAdding ? '✕' : '+ Pergunta'}
          </button>
        </div>

        {/* Modal Adicionar */}
        {isAdding && (
          <div className="mb-8 bg-white border-2 border-emerald-200 p-6 rounded-3xl shadow-xl animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-black text-emerald-800 mb-4 text-lg">Nova Afirmação</h3>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <textarea
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Ex: No número 24, o 2 representa duas dezenas."
                className="w-full p-4 rounded-xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 outline-none transition-all text-gray-700"
                rows={2}
                required
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setNewQuestionAnswer(true)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${newQuestionAnswer ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'}`}
                  >
                    VERDADEIRO
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewQuestionAnswer(false)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!newQuestionAnswer ? 'bg-white shadow-sm text-rose-600' : 'text-gray-400'}`}
                  >
                    FALSO
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-md"
                >
                  Salvar
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
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-xl p-8 md:p-14 mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-100"></div>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
            "{currentQuestion.question}"
          </p>

          <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={() => handleAnswer(true)}
              className={`flex-1 flex flex-col items-center gap-3 py-8 rounded-3xl transition-all border-4 text-3xl font-black
                ${answers[currentQuestion.id] === true 
                  ? 'bg-indigo-600 border-indigo-300 text-white scale-105 shadow-xl' 
                  : 'bg-indigo-50 border-transparent text-indigo-400 hover:border-indigo-200'}`}
            >
              V
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Verdadeiro</span>
            </button>
            
            <button
              onClick={() => handleAnswer(false)}
              className={`flex-1 flex flex-col items-center gap-3 py-8 rounded-3xl transition-all border-4 text-3xl font-black
                ${answers[currentQuestion.id] === false 
                  ? 'bg-rose-600 border-rose-300 text-white scale-105 shadow-xl' 
                  : 'bg-rose-50 border-transparent text-rose-400 hover:border-rose-200'}`}
            >
              F
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Falso</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-5 rounded-2xl font-bold transition-all shadow-sm
              ${currentIndex === 0 
                ? 'text-gray-300 bg-gray-50 cursor-not-allowed opacity-50' 
                : 'text-indigo-600 bg-white border-2 border-indigo-50 hover:bg-indigo-100 active:scale-95'}`}
            title="Anterior"
          >
            ←
          </button>

          <div className="flex-grow flex items-center gap-2">
            {currentIndex === localQuestions.length - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-emerald-500 text-white p-5 rounded-2xl font-black text-lg shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
              >
                Ver Resultado Final
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-lg hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Próxima Pergunta →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
