import { TestBed } from '@angular/core/testing';

import { CreateNodeService } from './create-node.service';

describe('CreateNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateNodeService = TestBed.get(CreateNodeService);
    expect(service).toBeTruthy();
  });
});
