import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSentimentFieldService {
  sentiment$ = new BehaviorSubject<number>(null)

  setSentiment(sentiment: number) {
    this.sentiment$.next(sentiment)
  }

  clearSentiment() {
    this.sentiment$.next(null)
  }
}
