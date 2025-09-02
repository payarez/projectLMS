import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnrollments } from './create-enrollments';

describe('CreateEnrollments', () => {
  let component: CreateEnrollments;
  let fixture: ComponentFixture<CreateEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
