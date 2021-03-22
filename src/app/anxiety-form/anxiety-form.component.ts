import { NgForm, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { sentimentMap } from './sentiment-map';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent implements OnInit{
  anxietyForm: FormGroup;
  sentimentMap = sentimentMap;
  sentiment: number = null;
  newSymptom = false;
  currentSymptoms: string[] = []
  formSubmitted = false;

  // Firestore Collections
  private symptomCollection: AngularFirestoreCollection<Symptom>;
  private anxietyEventCollection: AngularFirestoreCollection<AnxietyEvent>;

 // Firestore Collection Observables
 symptoms: Observable<Symptom[]>;
 anxietyEvents: Observable<any[]>;

 constructor (private firestore: AngularFirestore) {
   // Initialize Firestore
   this.symptomCollection = firestore.collection<Symptom>('symptoms');
   this.symptoms = this.symptomCollection.valueChanges();

   this.anxietyEventCollection = firestore.collection<AnxietyEvent>('anxietyEvents');
   this.anxietyEvents = this.anxietyEventCollection.valueChanges();
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

  setSentiment(value: number) {
    // Set sentiment from 0 to 4, sad to happy
    this.sentiment = value;
  }

  // Handlers
  handleAddSymptom() {
    // TODO: Store db ID with symptoms incase the names ever need to be updated.
    const symptomValue = this.anxietyForm.value.symptom
    const valid = this.anxietyForm.controls.symptom.status === 'VALID' && !this.currentSymptoms.includes(symptomValue)
    if (valid) {
      // const symptomDisplay = this.firestore.collection('symptoms', ref => ref.where('value', '==', symptomValue)).valueChanges()
      this.firestore.collection('symptoms', ref => ref.where('value', '==', symptomValue).limit(1)).valueChanges()
        .pipe(
          take(1)
        )
        .subscribe((result: Symptom[]) => {
          this.currentSymptoms = [...this.currentSymptoms, result[0].display]
        })
    }
    this.anxietyForm.reset('symptom')
  }

  handleSelectChange() {
    console.log('select change')
    if (this.anxietyForm.controls.symptom.value === "add-symptom") {
      this.newSymptom = true
    }
  }

  handleDeleteSymptom(symptom: string) {
    console.log('deleting', symptom)
    const symptomIndex = this.currentSymptoms.findIndex(s => s === symptom)
    console.log(symptomIndex)
    const tmpCurrentSymptoms = [...this.currentSymptoms]
    tmpCurrentSymptoms.splice(symptomIndex,1)
    this.currentSymptoms = tmpCurrentSymptoms
  }

  handleClearForm() {
    this.sentiment = null;
    this.currentSymptoms = []
    this.formSubmitted = false
    this.initForm()
  }

  closeModal(event) {
    this.newSymptom = false
    this.anxietyForm.reset('symptom')
  }

  // Once all the functionality is moved to a service, this should be part of the new-symptom componenent
  addNewSymptom(symptomDisplay: string) {
    const symptomValue = symptomDisplay.split(' ').join('-').toLowerCase()
    const newSymptom: Symptom = {
      display: symptomDisplay,
      value: symptomValue
    }

    // Add new symptom to firebase if valid
    this.symptoms.subscribe(symptoms => {
      const filterdSymptoms = symptoms.filter(symptom => symptom.value === newSymptom.value)
      const valid = filterdSymptoms.length === 0

      if (valid) {
        console.log('[addNewSymptom]', newSymptom)
        this.symptomCollection.add(newSymptom)
        this.currentSymptoms = [...this.currentSymptoms, newSymptom.display]
      }
    })

    this.newSymptom = false
    this.anxietyForm.reset('symptom')
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
      symptoms: this.currentSymptoms,
      thoughts: this.anxietyForm.controls.thoughts.value
    }

    // Add to Firestore
    this.anxietyEventCollection.add(newEvent);

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
