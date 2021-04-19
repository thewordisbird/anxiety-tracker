import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnxietyEvent, Emotion, FsUser, Symptom } from '../models';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnxietyFormService{
  // sentiment$ = new Subject<number>();
  symptoms$ = new Subject<Symptom[]>();
  emotions$ = new Subject<Emotion[]>();

  // private sentiment: number = null;
  private symptoms: Symptom[] = [];
  private emotions: Emotion[] = [];

  user: FsUser;

  constructor(
    private dataStorageService: DataStorageService
  ) {
    this.dataStorageService.user.subscribe(user => {
      this.user = user
    })
  }

  // updateSentiment(sentiment: number) {
  //   this.sentiment = sentiment;
  //   this.sentiment$.next(sentiment)
  // }

  updateSymptoms(symptom: Symptom) {
    this.symptoms.push(symptom)
    this.symptoms$.next(this.symptoms.slice())
  }

  updateEmotions(emotion: Emotion) {
    this.emotions.push(emotion)
    this.emotions$.next(this.emotions.slice())
  }

  removeOptionItem(item: {type: string, value: number}) {
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
    const updatedSymptoms = this.symptoms.filter(symptom => symptom.value !== symptomValue)
    this.symptoms = [...updatedSymptoms]
    this.symptoms$.next(this.symptoms.slice())
  }

  removeEmotion(emotionValue) {
    const updatedEmotions = this.emotions.filter(emotion => emotion.value !== emotionValue)
    this.emotions = [...updatedEmotions]
    this.emotions$.next(this.emotions.slice())
  }

  clearSymptoms() {
    this.symptoms = []
    this.symptoms$.next(this.symptoms.slice())
  }

  clearEmotions() {
    this.emotions = []
    this.emotions$.next(this.emotions.slice())
  }

  addNewOptionItem(item: {display: string, value: string, type: string}) {
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

  storeFormData(submissionData) {
    const newAnxietyEvent: AnxietyEvent = {
     ...submissionData,
     symptoms: this.symptoms,
     emotions: this.emotions
    }

    this.dataStorageService.addAnxietyEvent(newAnxietyEvent)
  }
}
