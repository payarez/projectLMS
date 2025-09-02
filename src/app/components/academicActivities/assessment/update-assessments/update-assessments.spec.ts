import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssessments } from './update-assessments';

describe('UpdateAssessments', () => {
  let component: UpdateAssessments;
  let fixture: ComponentFixture<UpdateAssessments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAssessments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssessments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
