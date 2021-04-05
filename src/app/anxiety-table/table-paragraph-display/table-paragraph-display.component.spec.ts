import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParagraphDisplayComponent } from './table-paragraph-display.component';

describe('TableThoughtsDisplayComponent', () => {
  let component: TableParagraphDisplayComponent;
  let fixture: ComponentFixture<TableParagraphDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableParagraphDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableParagraphDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
