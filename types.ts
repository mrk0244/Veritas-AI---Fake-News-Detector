export enum Classification {
  REAL = 'REAL',
  FAKE = 'FAKE',
  UNCERTAIN = 'UNCERTAIN'
}

export interface LinguisticFeatures {
  emotionalTone: number; // 0-100
  sensationalism: number; // 0-100
  factuality: number; // 0-100
  sourceCredibility: number; // 0-100
  biasLevel: number; // 0-100
}

export interface AnalysisResult {
  classification: Classification;
  confidenceScore: number; // 0-100
  summary: string;
  features: LinguisticFeatures;
  keyIndicators: string[];
  svmVectorAnalysis: string; // Simulated technical explanation
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  excerpt: string;
  result: AnalysisResult;
}