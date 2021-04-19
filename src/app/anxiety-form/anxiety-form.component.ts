import { FormGroupDirective, Validators } from '@angular/forms';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { Symptom, Emotion } from '../shared/models';
import { AnxietyFormService } from './anxiety-form.service';
import { Subscription } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';
import { FormSentimentFieldComponent } from './form-sentiment-field/form-sentiment-field.component';

@Component({
  selector: 'app-anxiety-form',
  templateUrl: './anxiety-form.component.html',
  styleUrls: ['./anxiety-form.component.css']
})
export class AnxietyFormComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild(FormSentimentFieldComponent) sentimentComponent: FormSentimentFieldComponent;

  anxietyForm: FormGroup;

  symptomsSubscription: Subscription;
  emotionsSubscription: Subscription;

  sentiment: number;
  symptoms: Symptom[] = [];
  emotions: Emotion[] = [];

  formSubmitted: boolean = false;

  constructor (
    private anxietyFormService: AnxietyFormService,
    private dataStorageService: DataStorageService
  ) {

    this.symptomsSubscription = this.anxietyFormService.symptoms$
      .subscribe((symptoms: Symptom[]) => {
        this.symptoms = symptoms
      })

    this.emotionsSubscription = this.anxietyFormService.emotions$
      .subscribe((emotions: Emotion[]) => {
        this.emotions = emotions
      })
  };

  compareFn = (a, b) => {
    console.log('in compare')
    if (a.value < b.value) {
      return -1
    }
    if (a.value > b.value) {
      return 1
    }
    return 0;
  }

  symptomOptions$ = this.dataStorageService.user.pipe(
    map(user => user.symptoms),
    map(symptoms => symptoms.sort(this.compareFn))
  )

  emotionOptions$ = this.dataStorageService.user.pipe(
    map(user => user.emotions),
    map(emotions => emotions.sort(this.compareFn))
  )

  ngOnInit() {
    this.initForm()
  }

  ngAfterViewChecked() {
    this.sentiment = this.sentimentComponent.selected
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions
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
  }

  onClearForm(formDirective: FormGroupDirective) {
    this.sentimentComponent.clearSentiment();
    this.anxietyFormService.clearSymptoms();
    this.anxietyFormService.clearEmotions();

    // Clear and reset form
    formDirective.resetForm();
    this.anxietyForm.reset();
    this.formSubmitted = false;
  }

  onSubmit(formDirective: FormGroupDirective){
    if (this.anxietyForm.valid && !!this.sentiment && !!this.symptoms && !!this.emotions) {
      const submissionData = {
        ...this.anxietyForm.value,
        level: this.sentimentComponent.selected
      }
      this.anxietyFormService.storeFormData(submissionData)
      this.onClearForm(formDirective)
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


