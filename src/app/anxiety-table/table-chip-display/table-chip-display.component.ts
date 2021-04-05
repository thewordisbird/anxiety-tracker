import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chip-display',
  templateUrl: './table-chip-display.component.html',
  styleUrls: ['./table-chip-display.component.css']
})
export class TableChipDisplayComponent implements OnInit {
@Input() title: string;
@Input() data: {display: string, value: string}[];

  constructor() { }

  ngOnInit(): void {
  }

}
