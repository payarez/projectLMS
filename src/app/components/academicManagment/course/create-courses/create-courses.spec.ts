import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourses } from './create-courses';

describe('CreateCourses', () => {
  let component: CreateCourses;
  let fixture: ComponentFixture<CreateCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
