import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessons } from './create-lessons';

describe('CreateLessons', () => {
  let component: CreateLessons;
  let fixture: ComponentFixture<CreateLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
