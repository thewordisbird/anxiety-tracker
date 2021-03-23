import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent implements OnInit{
  anxietyForm: FormGroup;

  sentiment: number = null;
  symptoms = []
  emotions = []

  formSubmitted = false;

  // Temp data... will be retrieved from firebase (thru service)
  symptomOptions = [
    {display: "Chest Stiffness", value: "chest-stiffness"},
    {display: "Head Ache", value: "head-ache"},
    {display: "Stomach Pain", value: "stomach-pain"}
  ]

  emotionOptions = [
    {display: "Sad", value: "sad"},
    {display: "Happy", value: "happy"},
    {display: "Scared", value: "scared"},
    {display: "Angry", value: "angry"},
    {display: "Surprised", value: "suprised"},
    {display: "Disgusted", value: "disgusted"},
  ]
  // Firestore Collections
  // private symptomCollection: AngularFirestoreCollection<Symptom>;
  // private anxietyEventCollection: AngularFirestoreCollection<AnxietyEvent>;

 // Firestore Collection Observables
//  symptoms: Observable<Symptom[]>;
//  anxietyEvents: Observable<any[]>;

 constructor (private firestore: AngularFirestore) {
   // Initialize Firestore
  //  this.symptomCollection = firestore.collection<Symptom>('symptoms');
  //  this.symptoms = this.symptomCollection.valueChanges();

  //  this.anxietyEventCollection = firestore.collection<AnxietyEvent>('anxietyEvents');
  //  this.anxietyEvents = this.anxietyEventCollection.valueChanges();
  };

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const date = '';
    const time = '';
    const symptom = '';
    const thoughts = ''

    this.anxietyForm = new FormGroup({
      'date': new FormControl(date, Validators.required),
      'time': new FormControl(time, Validators.required),
      'symptom': new FormControl(symptom, Validators.required),
      'thoughts': new FormControl(thoughts, Validators.required)
    })
  }

  // Handlers
  handleSetSentiment(event) {
    this.sentiment = event
  }

  handleClearForm() {
    this.sentiment = null;
    this.symptoms = []
    this.emotions = []
    this.formSubmitted = false
    this.initForm()
  }

  onSubmit(){
    // Validate Sentiment
    if (this.sentiment === null) {
      this.formSubmitted = true
      return
    }

    const newEvent: AnxietyEvent = {
      level: this.sentiment,
      date: this.anxietyForm.controls.date.value,
      time: this.anxietyForm.controls.time.value,
      symptoms: this.symptoms,
      thoughts: this.anxietyForm.controls.thoughts.value
    }

    // Add to Firestore
    // this.anxietyEventCollection.add(newEvent);

    this.handleClearForm()
  }
}

// Interfaces
interface AnxietyEvent {
  level: number;
  date: Date;
  time: string;
  symptoms: string[];
  thoughts: string;
}

interface Symptom {
  display: string,
  value: string
}
