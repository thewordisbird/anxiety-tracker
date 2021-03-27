import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent {
  @Input() fieldLabel: string;
  @Output() newItem = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  item: string;

  constructor() {}

  handleAddItem() {
    this.newItem.emit(this.item)
  }

  handleClose() {
    this.close.emit();
  }
}
