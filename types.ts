
export enum Section {
  History = 'history',
  PlaceValue = 'place_value',
  Composition = 'composition',
  Quiz = 'quiz'
}

export interface HistoricalSystem {
  name: string;
  id: string;
  description: string;
  symbols: { val: number; char: string; svg?: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  correctAnswer: boolean;
}
