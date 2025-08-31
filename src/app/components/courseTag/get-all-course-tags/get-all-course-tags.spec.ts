import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCourseTags } from './get-all-course-tags';

describe('GetAllCourseTags', () => {
  let component: GetAllCourseTags;
  let fixture: ComponentFixture<GetAllCourseTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCourseTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCourseTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
