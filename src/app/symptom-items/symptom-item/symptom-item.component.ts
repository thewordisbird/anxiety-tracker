import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-symptom-item',
  templateUrl: './symptom-item.component.html',
  styleUrls: ['./symptom-item.component.css']
})
export class SymptomItemComponent implements OnInit {
  @Input() symptoms: string[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.symptoms)
  }

  handleRemove(symptom) {
    const updatedSymptoms = this.symptoms.filter(elem => elem !== symptom)
    this.symptoms = updatedSymptoms
  }
}
