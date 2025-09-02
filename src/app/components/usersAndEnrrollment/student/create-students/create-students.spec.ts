import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudents } from './create-students';

describe('CreateStudents', () => {
  let component: CreateStudents;
  let fixture: ComponentFixture<CreateStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
