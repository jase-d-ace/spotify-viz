// In reference to ./backend/src/services/openai.ts schema

export interface Analysis {
  colors: string[];
  description: string;
}

export interface AnalysisResponse {
  analysis: Analysis;
  status: number;
  error?: string;
}
