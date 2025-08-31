import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttempts } from './update-attempts';

describe('UpdateAttempts', () => {
  let component: UpdateAttempts;
  let fixture: ComponentFixture<UpdateAttempts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAttempts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAttempts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
