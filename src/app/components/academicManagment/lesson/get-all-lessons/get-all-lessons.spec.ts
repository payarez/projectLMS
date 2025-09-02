import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllLessons } from './get-all-lessons';

describe('GetAllLessons', () => {
  let component: GetAllLessons;
  let fixture: ComponentFixture<GetAllLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllLessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
