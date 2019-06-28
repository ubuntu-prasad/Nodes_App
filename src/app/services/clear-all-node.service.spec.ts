import { TestBed } from '@angular/core/testing';

import { ClearAllNodeService } from './clear-all-node.service';

describe('ClearAllNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearAllNodeService = TestBed.get(ClearAllNodeService);
    expect(service).toBeTruthy();
  });
});
