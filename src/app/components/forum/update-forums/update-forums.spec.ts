import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForums } from './update-forums';

describe('UpdateForums', () => {
  let component: UpdateForums;
  let fixture: ComponentFixture<UpdateForums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateForums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateForums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
