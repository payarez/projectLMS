import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseTags } from './create-course-tags';

describe('CreateCourseTags', () => {
  let component: CreateCourseTags;
  let fixture: ComponentFixture<CreateCourseTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
