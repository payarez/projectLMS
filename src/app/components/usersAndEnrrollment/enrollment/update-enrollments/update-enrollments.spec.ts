import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnrollments } from './update-enrollments';

describe('UpdateEnrollments', () => {
  let component: UpdateEnrollments;
  let fixture: ComponentFixture<UpdateEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
