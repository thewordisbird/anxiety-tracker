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

  addSymptom(symptom) {
    console.log(symptom)
  }
}
