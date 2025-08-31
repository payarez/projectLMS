import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePosts } from './create-posts';

describe('CreatePosts', () => {
  let component: CreatePosts;
  let fixture: ComponentFixture<CreatePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
