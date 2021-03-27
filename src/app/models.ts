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
  level: number;
  date: Date;
  time: string;
  symptoms: Symptom[];
  emotions: Emotion[];
  thoughts: string;
}
