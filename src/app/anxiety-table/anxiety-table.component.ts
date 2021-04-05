import {Component, OnChanges, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AnxietyEvent } from '../models'


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
export class AnxietyTableComponent implements OnInit, OnChanges{
  displayColumns : string[] = ['toggle', 'date', 'time', 'level']
  dataColumns: string[] = ['date', 'time', 'level']
  expandedElement: AnxietyEvent | null;
  expandedElements: {};
  anxietyEvents = []

  constructor (private dataStorageService: DataStorageService) {
    // TODO: Need to figure out better way to get datestring. currently require date field type to be any
    this.dataStorageService.anxietyEvents.subscribe(anxietyEvents => {
      this.anxietyEvents = anxietyEvents.map(element => {
        const eventDate = new Date(element.date.seconds * 1000);
        return {...element, date: eventDate.toDateString()}
      });

      console.log(this.anxietyEvents)
      this.expandedElements = anxietyEvents.reduce((acc, cur) => {
        return {...acc, [cur.id]: false}
      }, {})
    })
  };

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('changes', this.expandedElement)
  }

  toggleExpand(anxietyEvent: AnxietyEvent) {

    if (this.expandedElement === anxietyEvent) {
      // Case where same element is clicked. Toggle expansion
      this.expandedElements[anxietyEvent.id] = !this.expandedElements[anxietyEvent.id];
      this.expandedElement = null
    } else {
      // Case where new element is clicked
      const currentElementId = this.expandedElement ? this.expandedElement.id : null
      if ( currentElementId ) {
        // Close the previous expanded element
        this.expandedElements[currentElementId] = false;
      }
      this.expandedElements[anxietyEvent.id] = !this.expandedElements[anxietyEvent.id];
      this.expandedElement = anxietyEvent
    }



  }

}
