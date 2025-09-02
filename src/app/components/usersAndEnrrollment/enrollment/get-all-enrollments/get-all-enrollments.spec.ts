import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllEnrollments } from './get-all-enrollments';

describe('GetAllEnrollments', () => {
  let component: GetAllEnrollments;
  let fixture: ComponentFixture<GetAllEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
