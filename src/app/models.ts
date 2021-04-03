export interface Symptom {
  display: string;
  value: string;
  id?: string;
}

export interface Emotion {
  display: string;
  value: string;
  id?: string;
}

export interface AnxietyEvent {
  id: string;
  level: number;
  date: any;
  time: string;
  symptoms: Symptom[];
  emotions: Emotion[];
  thoughts: string;
}
