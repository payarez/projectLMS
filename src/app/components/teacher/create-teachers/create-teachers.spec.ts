import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeachers } from './create-teachers';

describe('CreateTeachers', () => {
  let component: CreateTeachers;
  let fixture: ComponentFixture<CreateTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTeachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeachers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
