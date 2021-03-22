import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomItemsComponent } from './symptom-items.component';

describe('SymptomItemsComponent', () => {
  let component: SymptomItemsComponent;
  let fixture: ComponentFixture<SymptomItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
