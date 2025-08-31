import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPosts } from './get-all-posts';

describe('GetAllPosts', () => {
  let component: GetAllPosts;
  let fixture: ComponentFixture<GetAllPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
