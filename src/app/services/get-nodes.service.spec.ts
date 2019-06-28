import { TestBed } from '@angular/core/testing';

import { GetNodesService } from './get-nodes.service';

describe('GetNodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNodesService = TestBed.get(GetNodesService);
    expect(service).toBeTruthy();
  });
});
