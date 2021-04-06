import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AnxietyFormService } from '../anxiety-form.service';

@Component({
  selector: 'app-form-chip-field',
  templateUrl: './form-chip-field.component.html',
  styleUrls: ['./form-chip-field.component.css']
})
export class FormChipFieldComponent {
  @Input() fieldLabel: string;
  @Input() itemOptions: ChipItem[]
  @Input() chipItems: ChipItem[]

  chipItem = new FormControl('')

  // TODO: Implemt custom validator. This field is valid if at least one chipItems.length > 0. It looks like there
  //  is an issue with whenthis runs as it triggers an error message indicating that this.chipItems is undefined.
  fieldValidator () {
    return () => {
      console.log('validating chip field')
      return this.chipItems.length === 0 ? {validationError: {message: "This field is required"}} : null
    }
  }

  showModal = false;

  constructor(private anxietyFormService: AnxietyFormService) {};

  // Handlers
  handleSelectChange() {
    if (this.chipItem.value === 'add-item') {
      this.showModal = true;
    }
  }

  handleAddItem() {
    // Checks that the form is valid and the item is not already in chipItems
    // TODO: Move logic to service. Need to set up query data subscription in service
    const valid = this.chipItem.value !== '' &&
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

      const type = this.fieldLabel.toLowerCase()

      this.anxietyFormService.addOptionItem(newChipItem, type)
      this.chipItem.reset('')
    }
  }

  handleRemoveChip(itemValue) {
    const type = this.fieldLabel.toLowerCase()
    this.anxietyFormService.removeOptionItem({value: itemValue, type: type})
  }

  // Modal event handlers
  handleAddNewItem(event: string) {
    const display = event;
    const value = display.toLowerCase().split(' ').join('-')

    const newChipItem = {
      display: display,
      value: value,
      type: this.fieldLabel.toLowerCase()
    }

    this.anxietyFormService.addNewOptionItem(newChipItem)

    this.showModal = false;
    this.chipItem.reset('')
  }

  handleCloseModal() {
    this.showModal = false;
    this.chipItem.reset('')
  }
}

interface ChipItem {
  display: string,
  value: string,
  id?: string
  type?: string
}
