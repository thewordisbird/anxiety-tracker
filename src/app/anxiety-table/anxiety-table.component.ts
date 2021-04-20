import { Component, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';
import { AnxietyEvent } from '../shared/models'
import { map, tap } from 'rxjs/operators';

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
  displayColumns : string[] = ['toggle', 'date', 'time', 'level']
  dataColumns: string[] = ['date', 'time', 'level']
  expandedElement: AnxietyEvent | null;
  expandedElements: {};
  anxietyEvents = []

  constructor (private dataStorageService: DataStorageService) { };

  compareFn = (a: AnxietyEvent, b: AnxietyEvent) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    if (dateA < dateB) {
      return 1
    }
    if (dateA > dateB) {
      return -1
    }
    if (dateA === dateB) {
      const timeA = a.time.split(':')
      const minutesA = parseInt(timeA[0]) * 60 + parseInt(timeA[1])

      const timeB = b.time.split(':')
      const minutesB = parseInt(timeB[0]) * 60 + parseInt(timeB[1])
      console.log(minutesA, minutesB)
      if (minutesA > minutesB) {
        return 1
      }

      if (minutesA < minutesB) {
        return -1
      }
    }
    return 0;
  }

  events$ = this.dataStorageService.anxietyEvents.pipe(
    // Set the expandedElements object. events$ is subscribed to in the template using the asyn pipe.
    tap(events => {
      this.expandedElements = events.reduce((acc, cur) => {
            // console.log(cur)
            return {...acc, [cur.id]: false}
          }, {})
    }),
    map(events => {
      return events.map(event => {
          const eventDate = new Date(event.date.seconds * 1000);
          return {...event, date: eventDate.toDateString()}
        })
    }),
    map(events => events.sort(this.compareFn))
  )

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
