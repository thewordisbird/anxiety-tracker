import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-new-symptom',
  templateUrl: './new-symptom.component.html',
  styleUrls: ['./new-symptom.component.css']
})
export class NewSymptomComponent implements OnInit {
  @Output() newSymptom = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  symptom: string

  constructor() { }

  ngOnInit(): void {
  }

  handleAddSymptom() {
    console.log(this.symptom)
    this.newSymptom.emit(this.symptom)
  }

  handleClose() {
    this.close.emit();
  }
}
