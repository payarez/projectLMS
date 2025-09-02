import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModules } from './update-modules';

describe('UpdateModules', () => {
  let component: UpdateModules;
  let fixture: ComponentFixture<UpdateModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
