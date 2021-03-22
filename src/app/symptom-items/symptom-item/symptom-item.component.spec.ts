import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomItemComponent } from './symptom-item.component';

describe('SymptomItemComponent', () => {
  let component: SymptomItemComponent;
  let fixture: ComponentFixture<SymptomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
