// In reference to ./backend/src/services/openai.ts schema

export interface Ranking {
  description: string;
  letter_ranking: string;
  number_ranking: number;
}

export interface Analysis {
  colors: string[];
  description: string
  ranking: Ranking;
}

export interface AnalysisResponse {
  analysis: Analysis;
}
