import { TestBed } from '@angular/core/testing';

import { ModuleS } from './module-s';

describe('ModuleS', () => {
  let service: ModuleS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
