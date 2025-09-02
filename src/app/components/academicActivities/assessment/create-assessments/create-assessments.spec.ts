import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessments } from './create-assessments';

describe('CreateAssessments', () => {
  let component: CreateAssessments;
  let fixture: ComponentFixture<CreateAssessments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssessments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssessments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
