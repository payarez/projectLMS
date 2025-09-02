import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTags } from './get-all-tags';

describe('GetAllTags', () => {
  let component: GetAllTags;
  let fixture: ComponentFixture<GetAllTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
