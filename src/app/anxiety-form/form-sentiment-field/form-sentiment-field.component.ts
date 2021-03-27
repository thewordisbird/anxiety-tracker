import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnxietyFormService } from '../anxiety-form.service';
import { sentimentMap } from './sentiment-map';
@Component({
  selector: 'app-form-sentiment-field',
  templateUrl: './form-sentiment-field.component.html',
  styleUrls: ['./form-sentiment-field.component.css']
})
export class FormSentimentFieldComponent implements OnInit, OnDestroy {
  // Note: Should sentiment be stored in the DB?
  @Input() inValid: boolean;
  sentimentMap = sentimentMap;
  selectedSentiment: number = null

  sentimentSubscription: Subscription;

  constructor(private anxietyFormService: AnxietyFormService) { }

  ngOnInit(): void {
    console.log('inValid?', this.inValid)
    this.sentimentSubscription = this.anxietyFormService.sentimentChanged$.subscribe( sentiment => {
      this.selectedSentiment = sentiment
    })
  }

  ngOnDestroy(): void {
    this.sentimentSubscription.unsubscribe()
  }

  setSentiment(value: number) {
    this.anxietyFormService.updateSentiment(value);
  }
}
