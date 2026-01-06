
import { HistoricalSystem, QuizQuestion } from './types';

export const HISTORICAL_SYSTEMS: HistoricalSystem[] = [
  {
    id: 'babylonian',
    name: 'Babilônico',
    description: 'Utilizavam símbolos de cunha (cuneiforme) e tinham base 60.',
    symbols: [
      { val: 1, char: '▼' },
      { val: 10, char: '◀' }
    ]
  },
  {
    id: 'egyptian',
    name: 'Egípcio',
    description: 'Sistema não posicional baseado em hieróglifos.',
    symbols: [
      { val: 1, char: '𓏽', svg: 'Bastão' },
      { val: 10, char: '𓎆', svg: 'Ferradura' },
      { val: 100, char: '𓍢', svg: 'Rolo de Corda' }
    ]
  },
  {
    id: 'roman',
    name: 'Romano',
    description: 'Sistema que utiliza letras para representar valores.',
    symbols: [
      { val: 1, char: 'I' },
      { val: 5, char: 'V' },
      { val: 10, char: 'X' },
      { val: 50, char: 'L' },
      { val: 100, char: 'C' }
    ]
  },
  {
    id: 'indo_arabic',
    name: 'Indo-Arábico',
    description: 'O sistema que usamos hoje. É decimal (base 10) e posicional.',
    symbols: [
      { val: 0, char: '0' },
      { val: 1, char: '1' },
      { val: 2, char: '2' },
      { val: 3, char: '3' }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "Ordem é a posição que cada algarismo ocupa em um número.", correctAnswer: true },
  { id: 2, question: "As ordens são contadas da esquerda para a direita.", correctAnswer: false },
  { id: 3, question: "Três ordens formam uma classe.", correctAnswer: true },
  { id: 4, question: "Uma classe é formada por dez ordens.", correctAnswer: false },
  { id: 5, question: "As classes são contadas da direita para a esquerda.", correctAnswer: true },
  { id: 6, question: "O número 1.000 possui exatamente 4 ordens.", correctAnswer: true },
  { id: 7, question: "A quarta ordem pertence à classe dos milhares.", correctAnswer: true },
  { id: 8, question: "A dezena é a terceira ordem das unidades simples.", correctAnswer: false },
  { id: 9, question: "No número 542, o algarismo 5 ocupa a ordem das centenas.", correctAnswer: true },
  { id: 10, question: "Dez unidades de milhar formam uma dezena de milhar.", correctAnswer: true }
];
