import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessons } from './update-lessons';

describe('UpdateLessons', () => {
  let component: UpdateLessons;
  let fixture: ComponentFixture<UpdateLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
