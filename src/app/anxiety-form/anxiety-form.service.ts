import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AnxietyEvent, Emotion, FsUser, Symptom } from '../models';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnxietyFormService{
  // submitted = new BehaviorSubject<boolean>(false)

  sentimentChanged$ = new Subject<number>();
  symptomsChanged = new Subject<Symptom[]>();
  emotionsChanged = new Subject<Emotion[]>();

  private sentiment: number = null;
  private symptoms: Symptom[] = [];
  private emotions: Emotion[] = [];

  user: FsUser;



  constructor(
    private dataStorageService: DataStorageService
  ) {
    this.dataStorageService.user.subscribe(user => {
      console.log('User info in anxiety form service', user)
      this.user = user
    })


  }

  updateSentiment(sentiment: number) {
    console.log('updateSentiment', sentiment)
    this.sentiment = sentiment;
    this.sentimentChanged$.next(sentiment)
  }

  updateSymptoms(symptom: Symptom) {
    console.log('updateSymptoms', symptom)
    this.symptoms.push(symptom)
    this.symptomsChanged.next(this.symptoms.slice())

  }

  updateEmotions(emotion: Emotion) {
    this.emotions.push(emotion)
    this.emotionsChanged.next(this.emotions.slice())
  }

  removeOptionItem(item) {
    switch (item.type) {
      case 'symptom':
        this.removeSymptom(item.value)
        break;
      case 'emotion':
        this.removeEmotion(item.value)
        break;
      default:
        return;
    }
  }
  removeSymptom(symptomValue) {
    const updatedSymptoms = this.symptoms.filter(symptom => {
      return symptom.value !== symptomValue
    })
    this.symptoms = [...updatedSymptoms]
    this.symptomsChanged.next(this.symptoms.slice())
  }

  removeEmotion(emotionValue) {
    const updatedEmotions = this.emotions.filter(emotion => {
      return emotion.value !== emotionValue
    })
    this.emotions = [...updatedEmotions]
    this.emotionsChanged.next(this.emotions.slice())
  }

  clearSymptoms() {
    this.symptoms = []
    this.symptomsChanged.next(this.symptoms.slice())
  }

  clearEmotions() {
    this.emotions = []
    this.emotionsChanged.next(this.emotions.slice())
  }

  addNewOptionItem(item: {display: string, value: string, type: string}) {
    console.log('[af-service, addNewOptionItem]', item)
    switch (item.type) {
      case 'symptom':
        const newSymptom: Symptom = {display: item.display, value: item.value}
        this.addNewSymptomOption(newSymptom)
        break;
      case 'emotion':
        const newEmotion: Emotion = {display: item.display, value: item.value}
        this.addNewEmotionOption(newEmotion)
        break;
      default:
        return;
    }
  }

  addNewSymptomOption(symptom: Symptom) {
    this.dataStorageService.addNewSymptom(symptom)
    this.updateSymptoms(symptom)
  }

  addNewEmotionOption(emotion: Emotion) {
    this.dataStorageService.addNewEmotion(emotion)
    this.updateEmotions(emotion)
  }

  addOptionItem(item: Symptom | Emotion, type: string) {
    switch (type) {
      case 'symptom':
        this.updateSymptoms(item)
        break;
      case 'emotion':
        this.updateEmotions(item)
        break;
      default:
        return;
    }

  }

  // formSubmitted(status:boolean) {
  //   this.submitted.subscribe(s => console.log('start submit status', s ))

  //   this.submitted.next(status)
  // }

  storeFormData(formData) {
    const newAnxietyEvent: AnxietyEvent = {
     ...formData,
     level: this.sentiment,
     symptoms: this.symptoms,
     emotions: this.emotions
    }

    console.log('service to fb', newAnxietyEvent)
    this.dataStorageService.addAnxietyEvent(newAnxietyEvent)
  }

  // Helpers
  // private validateOptionSelection(options: Symptom[] | Emotion[], optionItem) {
  //   console.log('validating', options, optionItem, optionItem.status)
  //   return optionItem.status === 'VALID' &&
  //     options
  //     .map(item => {
  //       return item.value !== optionItem.value
  //     })
  //     .reduce((acc, cur) => {
  //       return acc && cur
  //     }, true)
  // }
}
