import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Symptom, Emotion, AnxietyEvent, FsUser } from './models';

// TODO: Move the defaults to a new user class that will be included on instantiation of new user
const defaultSymptoms = [
  {display: 'Nausea', value: 'nausea'},
  {display: 'Shortness Of Breath', value: 'shortness-of-breath'},
  {display: 'Headache', value: 'headache'},
  {display: 'Fatigue', value: 'fatigue'},
  {display: 'Increased Heart Rate', value: 'increased-heart-rate'},
  {display: 'Sweating', value: 'sweating'},
  {display: 'Trembling', value: 'trembling'},
  {display: 'Muscle Tension', value: 'muscle-tension'},
]

const defaultEmotions = [
  {display: 'Fear', value: 'fear'},
  {display: 'Sadness', value: 'sadness'},
  {display: 'Anger', value: 'Anger'},
  {display: 'Joy', value: 'Joy'},
  {display: 'Surprise', value: 'surprise'},
  {display: 'Disgust', value: 'disgust'},
  {display: 'Anticipation', value: 'anticipation'},
  {display: 'Trust', value: 'trust'},
]

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private usersCollection: AngularFirestoreCollection<FsUser>;
  private userDoc: AngularFirestoreDocument<FsUser>;
  private anxietyEventsCollection: AngularFirestoreCollection<AnxietyEvent>;

  user: Observable<FsUser>
  symptoms: Symptom[]
  emotions: Emotion[]
  anxietyEvents: Observable<AnxietyEvent[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.usersCollection = afs.collection('users');

    this.authService.user.subscribe(user => {
      if (user) {
        this.userDoc = this.usersCollection.doc(user.id)
        this.user = this.userDoc.valueChanges()
        this.anxietyEventsCollection = this.userDoc.collection('events')
        this.anxietyEvents = this.anxietyEventsCollection.valueChanges()
      }
    })
  }

  addUser(userId: string, userEmail: string) {
    this.usersCollection.doc(userId).set({
      email: userEmail,
      symptoms: defaultSymptoms,
      emotions: defaultEmotions,
    })
  }

  addNewSymptom(symptom: Symptom) {
    this.user.pipe(
      take(1),
      tap(user => {
        this.userDoc.update(
          {symptoms: [...user.symptoms, {...symptom}]}
        ).then(() => {
          this.symptoms.push(symptom)
        }).catch(err => {
          console.log(`An error occured attempting to add a new symptom to firebase ${err}`)
        })
      })
    ).subscribe()
  }

  addNewEmotion(emotion: Emotion) {
    this.user.pipe(
      take(1),
      tap(user => {
        this.userDoc.update(
        {emotions: [...user.emotions, {...emotion}]}
        ).then(() => {
          this.emotions.push(emotion)
        }).catch(err => {
          console.log(`An error occured attempting to add a new emotion to firebase ${err}`)
        })
      })
    ).subscribe()
  }

  addAnxietyEvent(anxietyEvent: AnxietyEvent) {
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
}


