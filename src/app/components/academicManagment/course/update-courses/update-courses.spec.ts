import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourses } from './update-courses';

describe('UpdateCourses', () => {
  let component: UpdateCourses;
  let fixture: ComponentFixture<UpdateCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
