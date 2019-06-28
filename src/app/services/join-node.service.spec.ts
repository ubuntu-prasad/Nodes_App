import { TestBed } from '@angular/core/testing';

import { JoinNodeService } from './join-node.service';

describe('JoinNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinNodeService = TestBed.get(JoinNodeService);
    expect(service).toBeTruthy();
  });
});
