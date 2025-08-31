import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllStudents } from './get-all-students';

describe('GetAllStudents', () => {
  let component: GetAllStudents;
  let fixture: ComponentFixture<GetAllStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
