import { Component, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';
import { AnxietyEvent } from '../models'
import { Subscription } from 'rxjs';

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
export class AnxietyTableComponent implements OnDestroy{
  displayColumns : string[] = ['toggle', 'date', 'time', 'level']
  dataColumns: string[] = ['date', 'time', 'level']
  expandedElement: AnxietyEvent | null;
  expandedElements: {};
  anxietyEvents = []

  dataStorageSubscription: Subscription

  constructor (private dataStorageService: DataStorageService) {
    // TODO: Need to figure out better way to get datestring. currently require date field type to be any
    this.dataStorageSubscription = this.dataStorageService.anxietyEvents.subscribe(anxietyEvents => {
      this.anxietyEvents = anxietyEvents.map(element => {
        const eventDate = new Date(element.date.seconds * 1000);
        return {...element, date: eventDate.toDateString()}
      });

      this.expandedElements = anxietyEvents.reduce((acc, cur) => {
        return {...acc, [cur.id]: false}
      }, {})
    })
  };

  ngOnDestroy() {
    this.dataStorageSubscription.unsubscribe()
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
