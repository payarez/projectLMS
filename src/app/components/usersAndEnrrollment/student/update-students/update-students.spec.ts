import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudents } from './update-students';

describe('UpdateStudents', () => {
  let component: UpdateStudents;
  let fixture: ComponentFixture<UpdateStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
