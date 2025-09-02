import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllForums } from './get-all-forums';

describe('GetAllForums', () => {
  let component: GetAllForums;
  let fixture: ComponentFixture<GetAllForums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllForums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllForums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
