import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent {
  symptomsOptions: string[] = [
    "Chest Stiffness",
    "Stomach Pain",
    "Light Headed"
  ]

  currentSymptoms: string[] = [
    "Stomach Pain",
    "Light Headed"
  ]

  sentimentIcons = [
    'sentiment_very_dissatisfied',
    'sentiment_dissatisfied',
    'sentiment_neutral',
    'sentiment_satisfied',
    'sentiment_very_satisfied'
  ]

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

  sentiment: number = null;

  setSentiment(idx) {
    // Set sentiment from 0 to 4, sad to happy
    console.log(idx)
    this.sentiment = idx
  }

  addSymptom(symptom) {
    console.log(symptom)
  }
}
