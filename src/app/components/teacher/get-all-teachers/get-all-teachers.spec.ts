import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTeachers } from './get-all-teachers';

describe('GetAllTeachers', () => {
  let component: GetAllTeachers;
  let fixture: ComponentFixture<GetAllTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllTeachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllTeachers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
