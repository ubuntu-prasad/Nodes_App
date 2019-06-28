import { TestBed } from '@angular/core/testing';

import { LeaveNodeService } from './leave-node.service';

describe('LeaveNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveNodeService = TestBed.get(LeaveNodeService);
    expect(service).toBeTruthy();
  });
});
