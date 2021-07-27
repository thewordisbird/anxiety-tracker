import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormSentimentFieldService } from './form-sentiment-field.service';
import { sentimentMap } from './sentiment-map';
@Component({
  selector: 'app-form-sentiment-field',
  templateUrl: './form-sentiment-field.component.html',
  styleUrls: ['./form-sentiment-field.component.css'],
})
export class FormSentimentFieldComponent implements OnDestroy {
  @Input() submitted: boolean;
  sentimentSubscription: Subscription;
  sentimentMap = sentimentMap;
  selected: number | null = null;

  constructor(private formSentimentFieldService: FormSentimentFieldService) {
    this.sentimentSubscription =
      this.formSentimentFieldService.sentiment$.subscribe((sentiment) => {
        this.selected = sentiment;
      });
  }

  ngOnDestroy() {
    this.sentimentSubscription.unsubscribe();
  }

  setSentiment(value: number) {
    this.formSentimentFieldService.setSentiment(value);
  }

  clearSentiment() {
    this.formSentimentFieldService.clearSentiment();
  }
}
