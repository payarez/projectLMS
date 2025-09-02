import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSubmissions } from './get-all-submissions';

describe('GetAllSubmissions', () => {
  let component: GetAllSubmissions;
  let fixture: ComponentFixture<GetAllSubmissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllSubmissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllSubmissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
