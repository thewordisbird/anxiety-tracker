import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anxiety-table',
  templateUrl: './anxiety-table.component.html',
  styleUrls: ['./anxiety-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AnxietyTableComponent {
  columnsToDisplay = ['date', 'time', 'level'];
  expandedElement: AnxietyEvent | null;

  // Firestore Collections
  private anxietyEventCollection: AngularFirestoreCollection<AnxietyEvent>;

  // Firestore Collection Observables
  anxietyEvents: Observable<any[]>;

  constructor (private firestore: AngularFirestore) {
    // Initialize Firestore
    this.anxietyEventCollection = firestore.collection<AnxietyEvent>('anxietyEvents');
    this.anxietyEvents = this.anxietyEventCollection.valueChanges();
  };
}

interface AnxietyEvent {
  level: number;
  date: Date;
  time: string;
  symptoms: string[];
  thoughts: string;
}
