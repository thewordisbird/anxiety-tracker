import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-paragraph-display',
  templateUrl: './table-paragraph-display.component.html',
  styleUrls: ['./table-paragraph-display.component.css']
})
export class TableParagraphDisplayComponent {
  @Input() title: string;
  @Input() content: string;
}
