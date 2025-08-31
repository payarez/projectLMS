import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModules } from './create-modules';

describe('CreateModules', () => {
  let component: CreateModules;
  let fixture: ComponentFixture<CreateModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
