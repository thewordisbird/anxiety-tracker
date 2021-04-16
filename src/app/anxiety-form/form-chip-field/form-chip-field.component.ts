import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AnxietyFormService } from '../anxiety-form.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { tap } from 'rxjs/operators';
import { invalid } from '@angular/compiler/src/render3/view/util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalid = !!(control && control.invalid );
    // console.log('errorstatematcher', invalidChips)
    return invalid;
  }
}

export function chipComponentValidator(chipCount: number, parentStatus: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inValid = parentStatus && chipCount === 0
    console.log('validator', parentStatus, chipCount, inValid)
    return inValid ? {inValid: true} : null
  }
}

@Component({
  selector: 'app-form-chip-field',
  templateUrl: './form-chip-field.component.html',
  styleUrls: ['./form-chip-field.component.css']
})
export class FormChipFieldComponent implements OnInit, OnChanges{
  @Input() fieldLabel: string;
  @Input() itemOptions: ChipItem[]
  @Input() chipItems: ChipItem[]
  @Input() submitted: boolean;
  @Output() isValid = new EventEmitter<boolean>(false);
  chipForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  showModal = false;
  // chipItem = new FormControl('', Validators.required)
  // submitted: boolean;


  constructor(private formBuilder: FormBuilder, private anxietyFormService: AnxietyFormService) {
  //  this.anxietyFormService.submitted.pipe(tap(submitted => {
  //    console.log('submitted status', submitted)
  //    this.submitted = submitted
  //  })).subscribe()
  };

  ngOnInit() {
    // console.log('oninit chip items', this.chipItems, this.chipItems.length)
    // this.componentValidator = () => {
    //   return () => {
    //     return this.chipItems.length > 0 ? null : {invalid: true}
    //   }
    // }
    // this.chipForm = this.formBuilder.group({
    //   chipItem: ['', chipComponentValidator(this.chipItems.length)]
    // })
  }

  ngOnChanges() {
    // console.log('running on changes', this.chipItems.length, this.submitted)
    this.chipForm = this.formBuilder.group({
      chipItem: ['', chipComponentValidator(this.chipItems.length, this.submitted)]
    })
  }




  // Service Subjects. Consumed by template using async pipe




  // Handlers
  handleSelectChange() {
    if (this.chipForm.controls.chipItem.value === 'add-item') {
      this.showModal = true;
    }
  }

  onSubmit() {
    // Checks that the form is valid and the item is not already in chipItems
    // TODO: Move logic to service. Need to set up query data subscription in service
    const valid = this.chipForm.controls.chipItem.value !== '' &&
      this.chipItems
      .map(item => {
        return item.value !== this.chipForm.controls.chipItem.value
      })
      .reduce((acc, cur) => {
        return acc && cur
      }, true)

    if (valid) {
      const newChipItem = this.itemOptions.filter(item => {
        return item.value === this.chipForm.controls.chipItem.value
      })[0]

      const type = this.fieldLabel.toLowerCase()

      this.anxietyFormService.addOptionItem(newChipItem, type)
      this.chipForm.reset()
      this.isValid.emit(true)
    }
  }

  handleRemoveChip(itemValue) {
    const type = this.fieldLabel.toLowerCase()
    this.anxietyFormService.removeOptionItem({value: itemValue, type: type})
    if (this.chipItems.length === 0) {
      this.isValid.emit(false)
    }
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
    this.chipForm.reset()
  }

  handleCloseModal() {
    this.showModal = false;
    this.chipForm.reset()
  }
}

interface ChipItem {
  display: string,
  value: string,
  id?: string
  type?: string
}
