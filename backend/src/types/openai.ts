// In reference to ./backend/src/services/openai.ts zod schema

export interface Analysis {
  colors: string[];
}

export interface AnalysisResponse {
  analysis: Analysis;
  status: number;
  error?: string;
}
