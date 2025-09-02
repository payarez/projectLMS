import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForums } from './create-forums';

describe('CreateForums', () => {
  let component: CreateForums;
  let fixture: ComponentFixture<CreateForums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateForums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateForums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
