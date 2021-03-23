import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChipFieldComponent } from './form-chip-field.component';

describe('FormChipFieldComponent', () => {
  let component: FormChipFieldComponent;
  let fixture: ComponentFixture<FormChipFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChipFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChipFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
