import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {
  @Input() fieldLabel: string;
  @Output() newItem = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  item: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleAddItem() {
    // Add to database
    this.newItem.emit(this.item)
  }

  handleClose() {
    this.close.emit();
  }
}
