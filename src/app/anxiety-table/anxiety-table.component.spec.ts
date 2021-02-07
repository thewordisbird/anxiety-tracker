import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyTableComponent } from './anxiety-table.component';

describe('AnxietyTableComponent', () => {
  let component: AnxietyTableComponent;
  let fixture: ComponentFixture<AnxietyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnxietyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnxietyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
