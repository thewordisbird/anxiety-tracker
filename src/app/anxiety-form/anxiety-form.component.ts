import { FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { Symptom, Emotion } from '../models';
import { AnxietyFormService } from './anxiety-form.service';
import { Subscription } from 'rxjs';
import { env } from 'process';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent implements OnInit, OnDestroy{
  anxietyForm: FormGroup;

  symptomOptions: Symptom[];
  emotionOptions: Emotion[];

  sentimentSubscription: Subscription
  symptomsSubscription: Subscription;
  emotionsSubscription: Subscription;

  sentiment: number = null;
  symptoms: Symptom[] = [];
  emotions: Emotion[] = [];

  sentimentValid: boolean = false

  formSubmitted: boolean = false;


  constructor (
    private anxietyFormService: AnxietyFormService,
    private dataStorageService: DataStorageService
  ) {
  };

  ngOnInit() {
    this.initForm()

    // TODO: Move to service
    this.dataStorageService.user.subscribe(user => {
      this.symptomOptions = user.symptoms
      this.emotionOptions = user.emotions
    })

    this.sentimentSubscription = this.anxietyFormService.sentimentChanged$
      .subscribe( sentiment => {
        this.sentiment = sentiment
      })

    this.symptomsSubscription = this.anxietyFormService.symptomsChanged
      .subscribe((symptoms: Symptom[]) => {
        this.symptoms = symptoms
      })

    this.emotionsSubscription = this.anxietyFormService.emotionsChanged
      .subscribe((emotions: Emotion[]) => {
        this.emotions = emotions
      })
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.unsubscribe(this.sentimentSubscription)
    this.unsubscribe(this.symptomsSubscription)
    this.unsubscribe(this.emotionsSubscription)
  }

  initForm() {
    const date = '';
    const time = '';
    const thoughts = ''

    // this.anxietyFormService.formSubmitted(false);
    this.formSubmitted = false;

    this.anxietyForm = new FormGroup({
      'date': new FormControl(date, Validators.required),
      'time': new FormControl(time, Validators.required),
      'thoughts': new FormControl(thoughts, Validators.required)
    })

    this.anxietyForm.markAsPristine()
    this.anxietyForm.markAsUntouched()
  }

  // Handlers
  onSentimentValid(event) {
    this.sentimentValid = event;
  }

  handleClearForm(formDirective: FormGroupDirective) {
    this.anxietyFormService.updateSentiment(null);
    this.anxietyFormService.clearSymptoms();
    this.anxietyFormService.clearEmotions();

    // Clear and reset form
    formDirective.resetForm();
    this.anxietyForm.reset();
    this.formSubmitted = false;
  }

  onSubmit(formDirective: FormGroupDirective){
    if (this.anxietyForm.valid && !!this.sentiment && !!this.symptoms && !!this.emotions) {
      this.anxietyFormService.storeFormData(this.anxietyForm.value)
      // this.handleClearForm()
      formDirective.resetForm()
      this.anxietyForm.reset()
    } else {
      // this.anxietyFormService.formSubmitted(true)
      this.formSubmitted = true
    }
  }

  // Helpers
  unsubscribe(subscription: Subscription) {
    // handles unsubscription cases when a subscription has not been set before navigation and is undefined
    try {
      subscription.unsubscribe()
    } catch (err) {
      return
    }
  }
}


