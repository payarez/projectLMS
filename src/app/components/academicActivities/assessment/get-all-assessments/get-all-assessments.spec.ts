import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAssessments } from './get-all-assessments';

describe('GetAllAssessments', () => {
  let component: GetAllAssessments;
  let fixture: ComponentFixture<GetAllAssessments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllAssessments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllAssessments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
