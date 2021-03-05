import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { sentimentMap } from './sentiment-map';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent {
  @ViewChild('f', {static: false}) anxietyForm: NgForm;
  sentimentMap = sentimentMap;
  sentiment: number = null;
  newSymptom = false
  currentSymptoms: string[] = []
  formSubmitted = false;

   // Firestore Collections
   private symptomCollection: AngularFirestoreCollection<Symptom>;
   private anxietyEventCollection: AngularFirestoreCollection<AnxietyEvent>;

  // Firestore Collection Observables
  symptoms: Observable<any[]>;
  anxietyEvents: Observable<any[]>;

  constructor (private firestore: AngularFirestore) {
    // Initialize Firestore
    this.symptomCollection = firestore.collection<Symptom>('symptoms');
    this.symptoms = this.symptomCollection.valueChanges();

    this.anxietyEventCollection = firestore.collection<AnxietyEvent>('anxietyEvents');
    this.anxietyEvents = this.anxietyEventCollection.valueChanges();
   };

  setSentiment(value: number) {
    // Set sentiment from 0 to 4, sad to happy
    this.sentiment = value;
  }

  handleSelectChange(symptom: string) {
    if (symptom === "add-symptom") {
      this.newSymptom = true
    }
  }

  handleAddSymptom(symptom: any) {
    // Check that symptom isn't in current symptoms. add if ok.
    // NEED TO CHANGE FIELD AFTER RETURN (I think i need to convert to a reactive form)
    // Having trouble with this. Moving on for now. Tried property binding, two way prop binding.
    // If symptom added -> set as symptom
    // If canceled -> clear state

    // TODO: Store db ID with symptoms incase the names ever need to be updated.
    const valid = this.currentSymptoms.find(s => s === symptom.triggerValue)
    if (!valid && symptom !== '') {
      this.currentSymptoms = [...this.currentSymptoms, symptom.triggerValue]
    }
    this.anxietyForm.setValue({
      symptom: '0'
    })
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
    this.anxietyForm.resetForm()
  }

  addNewSymptom(symptomDisplay: string) {
    const symptomValue = symptomDisplay.split(' ').join('-').toLowerCase()
    const newSymptom: Symptom = {
      display: symptomDisplay,
      value: symptomValue
    }

    // Add to Firestore
    this.symptomCollection.add(newSymptom)

    // Add symptom to current symptoms and reset newSymptom state
    this.handleAddSymptom(newSymptom.display)
    this.newSymptom = false;
  }

  closeModal() {
    this.newSymptom = false;
  }

  onSubmit(form: NgForm) {
    // Validate Sentiment
    if (this.sentiment === null) {
      this.formSubmitted = true
      return
    }

    const formData = this.anxietyForm.value
    const newEvent: AnxietyEvent = {
      level: this.sentiment,
      date: formData.date,
      time: formData.time,
      symptoms: this.currentSymptoms,
      thoughts: formData.thoughts
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
