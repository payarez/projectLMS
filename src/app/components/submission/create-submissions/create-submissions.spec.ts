import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubmissions } from './create-submissions';

describe('CreateSubmissions', () => {
  let component: CreateSubmissions;
  let fixture: ComponentFixture<CreateSubmissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubmissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubmissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
