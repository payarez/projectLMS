import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTags } from './create-tags';

describe('CreateTags', () => {
  let component: CreateTags;
  let fixture: ComponentFixture<CreateTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
