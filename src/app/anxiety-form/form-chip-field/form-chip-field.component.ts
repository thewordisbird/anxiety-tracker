import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AnxietyFormService } from '../anxiety-form.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { formChipFieldValidator } from './form-chip-field.validators'
import { ChipItem } from './form-chip-field.model'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalid = !!(control && control.invalid );
    return (invalid);
  }
}

@Component({
  selector: 'app-form-chip-field',
  templateUrl: './form-chip-field.component.html',
  styleUrls: ['./form-chip-field.component.css']
})
export class FormChipFieldComponent implements OnChanges{
  //TODO: Isolate from parent component to make more modular.
  @Input() fieldLabel: string;
  @Input() itemOptions: ChipItem[]
  @Input() chipItems: ChipItem[]
  @Input() submitted: boolean;

  chipForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  showModal = false;

  constructor(
    private formBuilder: FormBuilder,
    private anxietyFormService: AnxietyFormService
  ) {};

  ngOnChanges() {
    this.chipForm = this.formBuilder.group({
      chipItem: ['', formChipFieldValidator(this.chipItems.length, this.submitted)]
    })
  }

  // Handlers
  onSelectChange() {
    if (this.chipForm.controls.chipItem.value === 'add-item') {
      this.showModal = true;
    }
  }

  onSubmit() {
    const selectedChipItem = this.chipForm.controls.chipItem.value;
    const validSelection = selectedChipItem && this.chipItems
      .map(item => item.value !== selectedChipItem)
      .reduce((acc, cur) => acc && cur, true)

    if (validSelection) {
      const newChipItem = this.itemOptions.filter(item => item.value === selectedChipItem)[0]
      const type = this.fieldLabel.toLowerCase()
      this.anxietyFormService.addOptionItem(newChipItem, type)
    }
    this.chipForm.reset()
  }

  onRemoveChip(itemValue: number) {
    const type = this.fieldLabel.toLowerCase()
    this.anxietyFormService.removeOptionItem({value: itemValue, type: type})
  }

  // Modal event handlers
  onAddNewItem(event: string) {
    const display = event;
    const value = display.toLowerCase().split(' ').join('-')

    const newChipItem = {
      display: display,
      value: value,
      type: this.fieldLabel.toLowerCase()
    }

    this.anxietyFormService.addNewOptionItem(newChipItem)

    this.showModal = false;
    this.chipForm.reset()
  }

  onCloseModal() {
    this.showModal = false;
    this.chipForm.reset()
  }
}


