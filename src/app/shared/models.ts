import { AngularFirestoreCollection } from "@angular/fire/firestore";

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

export interface FsUser {
  id?: string;
  email: string;
  symptoms?: Symptom[];
  emotions?: Emotion[]
  events?: AngularFirestoreCollection<AnxietyEvent>
}
