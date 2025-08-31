import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubmissions } from './update-submissions';

describe('UpdateSubmissions', () => {
  let component: UpdateSubmissions;
  let fixture: ComponentFixture<UpdateSubmissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubmissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubmissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
