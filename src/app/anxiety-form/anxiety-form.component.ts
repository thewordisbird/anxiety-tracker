import { Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { Symptom, Emotion, AnxietyEvent } from '../models';
import { AnxietyFormService } from './anxiety-form.service';
import { Subscription } from 'rxjs';

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
  emotionsDataSubscription: Subscription;
  symptomsSubscription: Subscription;
  emotionsSubscription: Subscription;

  sentiment: number = null;
  symptoms: Symptom[] = [];
  emotions: Emotion[] = [];

  formSubmitted = false;

 constructor (
   private dataStorageService: DataStorageService,
   private anxietyFormService: AnxietyFormService
   ) {};

  ngOnInit() {
    console.log('ngoninit')
    this.initForm()

    this.dataStorageService.fetchSymptoms()
      .subscribe(symptomOptions => {
        this.symptomOptions = symptomOptions
      })

    this.dataStorageService.fetchEmotions()
      .subscribe(emotionOptions => {
        this.emotionOptions = emotionOptions
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
    this.unsubscribe(this.emotionsDataSubscription)
    this.unsubscribe(this.symptomsSubscription)
    this.unsubscribe(this.emotionsSubscription)
  }

  initForm() {
    const date = '';
    const time = '';
    const thoughts = ''

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

  handleClearForm() {
    this.anxietyFormService.updateSentiment(null);
    this.anxietyFormService.clearSymptoms();
    this.anxietyFormService.clearSymptoms();
    this.initForm()
  }

  onSubmit(){
    // console.log(new Date(this.anxietyForm.controls.date.value).toISOString())

    console.log('submitting', this.anxietyForm)
    if (this.anxietyForm.valid && !!this.sentiment && !!this.symptoms && !!this.emotions) {
      this.anxietyFormService.storeFormData(this.anxietyForm.value)
      this.handleClearForm()
    } else {
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


