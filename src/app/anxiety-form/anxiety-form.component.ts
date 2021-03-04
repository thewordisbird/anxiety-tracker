import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

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
  formSubmitted = false;




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
  symptomsOptions: Symptom[] = [
    {display: "Chest Stiffness", value: "chest-stiffness"},
    {display: "Stomach Ache", value: "stomach-ache"},
    {display: "Light Headed", value: "light-headed"}
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
    if (symptom === "add-symptom") {
      this.newSymptom = true
    }
  }

  handleAddSymptom(symptom: string) {
    // Check that symptom isn't in current symptoms. add if ok.
    // NEED TO CHANGE FIELD AFTER RETURN (I think i need to convert to a reactive form)
    // Having trouble with this. Moving on for now. Tried property binding, two way prop binding.
    // If symptom added -> set as symptom
    // If canceled -> clear state
    const valid = this.currentSymptoms.find(s => s === symptom)
    console.log(valid)
    if (!valid && symptom !== '') {
      this.currentSymptoms = [...this.currentSymptoms, symptom]
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

  addNewSymptom(symptom: string) {
    const newSymptomValue = symptom.split(' ').join('-').toLowerCase()
    console.log(newSymptomValue)
    const newSymptom: Symptom = {
      display: symptom,
      value: newSymptomValue
    }
    this.symptomsOptions.push(newSymptom)
    this.newSymptom = false;
    this.handleAddSymptom(newSymptom.display)

  }

  closeModal() {
    console.log('closing modal')
    this.newSymptom = false;
  }

  onSubmit(form: NgForm) {
    // Make sure a anxiety level was selected

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

    // Send submission to database
    console.log(newEvent)
    this.handleClearForm()
  }
}
