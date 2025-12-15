export interface ScriptData {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
}

export enum GeneratorStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedResponse {
  code: string;
  explanation?: string;
}