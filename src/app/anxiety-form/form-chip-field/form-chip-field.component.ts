import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-chip-field',
  templateUrl: './form-chip-field.component.html',
  styleUrls: ['./form-chip-field.component.css']
})
export class FormChipFieldComponent implements OnInit {
  @Input() itemOptions: ChipItem[]
  @Input() fieldLabel: string;
  @Output() removeItem = new EventEmitter<ChipItem>()
  @Output() addNewItem = new EventEmitter<ChipItem>()
  chipItem = new FormControl('', Validators.required)
  chipItems: ChipItem[] = [];
  showModal = false;

  constructor() {}

  ngOnInit(): void {
    console.log('Incoming Items, itemOptions', this.itemOptions)
  }

  // handlers
  handleAddItem() {
    // Checks that the form is valid and the item is not already in chipItems
    const valid = this.chipItem.status === 'VALID' &&
      this.chipItems
      .map(item => {
        return item.value !== this.chipItem.value
      })
      .reduce((acc, cur) => {
        return acc && cur
      }, true)

    if (valid) {
      const newChipItem = this.itemOptions.filter(item => {
        return item.value === this.chipItem.value
      })[0]

      this.chipItems = [...this.chipItems, newChipItem]
      this.chipItem.reset('')
    }
  }

  handleSelectChange() {
    // watch select field for 'add-item' to add an item to the select
    if (this.chipItem.value === 'add-item') {
      this.showModal = true;
    }
  }

  handleRemoveChip(itemValue) {
    this.removeItem.emit(itemValue)
  }

  // Modal handlers
  handleAddNewItem(event) {
    // Emit new item information
    this.addNewItem.emit()
    // close modal

    // reset options

  }

  handleCloseModal() {
    this.showModal = false;
  }
}


interface ChipItem {
  display: string,
  value: string,
  id?: string
}
