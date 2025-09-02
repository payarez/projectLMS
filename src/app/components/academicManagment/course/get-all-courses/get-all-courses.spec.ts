import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCourses } from './get-all-courses';

describe('GetAllCourses', () => {
  let component: GetAllCourses;
  let fixture: ComponentFixture<GetAllCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
