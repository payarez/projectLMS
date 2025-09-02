import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAttempts } from './get-all-attempts';

describe('GetAllAttempts', () => {
  let component: GetAllAttempts;
  let fixture: ComponentFixture<GetAllAttempts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllAttempts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllAttempts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
