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

  symptomsDataSubscription: Subscription;
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
    this.initForm()

    this.dataStorageService.fetchSymptoms()
      .subscribe(symptomOptions => {
        this.symptomOptions = symptomOptions
      })

    this.dataStorageService.fetchEmotions()
      .subscribe(emotionOptions => {
        this.emotionOptions = emotionOptions
      })

    this.symptomsSubscription = this.anxietyFormService.symptomsChanged.subscribe(
      (symptoms: Symptom[]) => {
        this.symptoms = symptoms
      }
    )

    this.emotionsSubscription = this.anxietyFormService.emotionsChanged.subscribe(
      (emotions: Emotion[]) => {
        this.emotions = emotions
      }
    )
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.symptomsDataSubscription.unsubscribe()
    this.emotionsDataSubscription.unsubscribe()
    this.symptomsSubscription.unsubscribe()
    this.emotionsSubscription.unsubscribe()
  }

  initForm() {
    const date = '';
    const time = '';
    const symptom = '';
    const thoughts = ''

    this.anxietyForm = new FormGroup({
      'date': new FormControl(date, Validators.required),
      'time': new FormControl(time, Validators.required),
      'thoughts': new FormControl(thoughts, Validators.required)
    })
  }

  // Handlers
  handleSetSentiment(event) {
    this.sentiment = event
    this.anxietyFormService.updateSentiment(event)
  }

  handleClearForm() {
    this.sentiment = null;
    this.anxietyFormService.updateSentiment(null);
    this.anxietyFormService.clearSymptoms();
    this.anxietyFormService.clearSymptoms();
    this.formSubmitted = false;
    this.initForm();
  }

  onSubmit(){
    // console.log(new Date(this.anxietyForm.controls.date.value).toISOString())
    console.log('submitting', this.anxietyForm)
    if (this.anxietyForm.valid && !!this.sentiment && !!this.symptoms && !!this.emotions) {
      this.anxietyFormService.storeFormData(this.anxietyForm.value)
      this.formSubmitted = true
      this.handleClearForm()
    }

  }
}


