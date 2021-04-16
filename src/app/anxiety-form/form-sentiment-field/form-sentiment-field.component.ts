import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnxietyFormService } from '../anxiety-form.service';
import { sentimentMap } from './sentiment-map';
@Component({
  selector: 'app-form-sentiment-field',
  templateUrl: './form-sentiment-field.component.html',
  styleUrls: ['./form-sentiment-field.component.css']
})
export class FormSentimentFieldComponent {
  // Note: Should sentiment be stored in the DB?
  @Input() submitted: boolean;
  @Output() isValid = new EventEmitter<boolean>(false);

  sentimentMap = sentimentMap;

  constructor(private anxietyFormService: AnxietyFormService) {}

  // Service Subjects. Consumed by template using async pipe
  sentiment = this.anxietyFormService.sentimentChanged$

  setSentiment(value: number) {
    this.anxietyFormService.updateSentiment(value);
    this.isValid.emit(true)
  }
}
