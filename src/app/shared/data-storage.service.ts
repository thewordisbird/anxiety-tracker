import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Symptom, Emotion, AnxietyEvent } from '../models';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private symptomsCollection: AngularFirestoreCollection<Symptom>;
  private emotionsCollection: AngularFirestoreCollection<Emotion>;
  private anxietyEventsCollection: AngularFirestoreCollection<AnxietyEvent>;

  symptoms: Observable<Symptom[]>;
  emotions: Observable<Emotion[]>;
  anxietyEvents: Observable<AnxietyEvent[]>;

  // symptom$: Observable<any>;
  // symptomValue$: Subject<string|null>;

  // querySymptomFromValue = this.symptomValue$.pipe(
  //   switchMap(symptomValue => this.afs.collection<Symptom>('symptoms', ref => ref.where('value', '==', symptomValue)).valueChanges())
  // )



  constructor(private afs: AngularFirestore) {
    this.symptomsCollection = afs.collection<Symptom>('symptoms');
    this.symptoms = this.symptomsCollection.valueChanges();

    this.emotionsCollection = afs.collection<Emotion>('emotions');
    this.emotions = this.emotionsCollection.valueChanges();

    this.anxietyEventsCollection = afs.collection<AnxietyEvent>('anxietyEvents')
    this.anxietyEvents = this.anxietyEventsCollection.valueChanges()

    // this.symptomValue$ = new Subject();
    // this.symptom$ = this.symptomValue$.pipe(
    //   switchMap((symptomValue: string) => {
    //     return this.afs.collection<Symptom>('symptoms', ref => ref.where('value', '==', symptomValue).limit(1)).valueChanges()[0]
    //   })
    // )

  }

  addNewSymptom(symptom: Symptom) {
    console.log('adding symptom to firebase', symptom)
    this.symptomsCollection.add(symptom)
  }

  addNewEmotion(emotion: Emotion) {
    console.log('adding emotion to firebase')
    this.emotionsCollection.add(emotion)
  }

  addAnxietyEvent(anxietyEvent: AnxietyEvent) {
    console.log('adding form data to firebase')
    this.anxietyEventsCollection.add(anxietyEvent)
  }

  fetchSymptoms() {
    return this.symptoms
  }

  fetchEmotions() {
     return this.emotions
  }

  fetchAnxietyEvents() {
    return this.anxietyEvents
  }


  // querySymptom(symptomValue) {
  //   console.log('updating symptom', symptomValue)
  //   this.symptomValue$.next(symptomValue)
  // }
}


