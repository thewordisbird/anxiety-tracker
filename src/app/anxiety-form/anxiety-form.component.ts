import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

interface anxietyEvent {
  level: number;
  date: Date;
  time: string;
  symptoms: string[];
  thoughts: string;
}


@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent implements OnInit {
  @ViewChild('f', {static: false}) anxietyForm: NgForm;
  // Set on sentiment click. Append to form data for submission to db.
  // MAKE SURE TO VALIDATE for form submission
  sentiment: number = null;
  newSymptom = false
  currentSymptoms: string[] = []





  // Sentiment Icon Map. svgName corrisponds to the google fonts name for the icon. Do Not Edit
  // OK to change the description.
  sentimentMap = [
    {
      svgName: 'sentiment_very_dissatisfied',
      description: 'Very Sad'
    },
    {
      svgName: 'sentiment_dissatisfied',
      description: 'Sad'
    },
    {
      svgName: 'sentiment_neutral',
      description: 'Fine'
    },
    {
      svgName: 'sentiment_satisfied',
      description: 'Happy'
    },
    {
      svgName: 'sentiment_very_satisfied',
      description: 'Very Happy'
    },

  ]

  // Temp symptoms options data
  // TODO: Connect to database
  symptomsOptions: string[] = [
    "Chest Stiffness",
    "Stomach Pain",
    "Light Headed"
  ]



  ngOnInit(): void {
    // console.log(this.anxietyForm)
    // this.anxietyForm.setValue({
    //   thoughts: 'Add Symptom'
    // })
  }

  setSentiment(idx) {
    // Set sentiment from 0 to 4, sad to happy
    console.log(idx)
    this.sentiment = idx
  }

  handleSelectChange(symptom: string) {
    if (symptom === "Add Symptom") {
      this.newSymptom = true
    }
  }

  handleAddSymptom(symptom: string) {
    // Check that symptom isn't in current symptoms. add if ok.
    const valid = this.currentSymptoms.find(s => s === symptom)
    console.log(valid)
    if (!valid && symptom !== '') {
      this.currentSymptoms = [...this.currentSymptoms, symptom]
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

  addNewSymptom(symptom: string) {
    this.symptomsOptions.push(symptom)
    this.newSymptom = false;
    // NEED TO CHANGE FIELD AFTER RETURN
    // If symptom added -> set as symptom
    // If canceled -> clear state
    this.anxietyForm.setValue({
      symptom: symptom
    })
  }

  closeModal() {
    console.log('closing modal')
    this.newSymptom = false;
  }

  onSubmit(form: NgForm) {

  }
}
