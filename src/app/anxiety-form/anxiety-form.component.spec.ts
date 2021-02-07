import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyFormComponent } from './anxiety-form.component';

describe('AnxietyFormComponent', () => {
  let component: AnxietyFormComponent;
  let fixture: ComponentFixture<AnxietyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnxietyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnxietyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
