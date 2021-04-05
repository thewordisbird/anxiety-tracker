import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChipDisplayComponent } from './table-chip-display.component';

describe('TableChipDisplayComponent', () => {
  let component: TableChipDisplayComponent;
  let fixture: ComponentFixture<TableChipDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableChipDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChipDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
