import { TestBed } from '@angular/core/testing';

import { NodeAvailabilityService } from './node-availability.service';

describe('NodeAvailabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeAvailabilityService = TestBed.get(NodeAvailabilityService);
    expect(service).toBeTruthy();
  });
});
