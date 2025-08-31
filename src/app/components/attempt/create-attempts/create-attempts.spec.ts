import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttempts } from './create-attempts';

describe('CreateAttempts', () => {
  let component: CreateAttempts;
  let fixture: ComponentFixture<CreateAttempts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAttempts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAttempts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
