import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllModules } from './get-all-modules';

describe('GetAllModules', () => {
  let component: GetAllModules;
  let fixture: ComponentFixture<GetAllModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
