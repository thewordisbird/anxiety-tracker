import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sentimentMap } from './sentiment-map';
@Component({
  selector: 'app-form-sentiment-field',
  templateUrl: './form-sentiment-field.component.html',
  styleUrls: ['./form-sentiment-field.component.css']
})
export class FormSentimentFieldComponent implements OnInit {
  // Note: Should sentiment be stored in the DB?
  @Input() valid: boolean;
  @Output() sentiment = new EventEmitter<number>()
  sentimentMap = sentimentMap;
  selectedSentiment: number = null
  constructor() { }

  ngOnInit(): void {
  }

  setSentiment(value: number) {
    // Set sentiment from 0 to 4, sad to happy
    this.selectedSentiment = value;
    this.sentiment.emit(value);
  }
}
