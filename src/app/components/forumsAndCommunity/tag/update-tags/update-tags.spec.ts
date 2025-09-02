import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTags } from './update-tags';

describe('UpdateTags', () => {
  let component: UpdateTags;
  let fixture: ComponentFixture<UpdateTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
