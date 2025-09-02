import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseTags } from './update-course-tags';

describe('UpdateCourseTags', () => {
  let component: UpdateCourseTags;
  let fixture: ComponentFixture<UpdateCourseTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourseTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourseTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
