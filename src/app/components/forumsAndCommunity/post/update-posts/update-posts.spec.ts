import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePosts } from './update-posts';

describe('UpdatePosts', () => {
  let component: UpdatePosts;
  let fixture: ComponentFixture<UpdatePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
