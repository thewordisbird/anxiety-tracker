import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symptom-items',
  templateUrl: './symptom-items.component.html',
  styleUrls: ['./symptom-items.component.css']
})
export class SymptomItemsComponent implements OnInit {
  symptoms = ['Symptom A', 'Symptom B', 'Symptom C', 'Symptom D']
  constructor() { }

  ngOnInit(): void {
  }

}
