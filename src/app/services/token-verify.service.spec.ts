import { TestBed } from '@angular/core/testing';

import { TokenVerifyService } from './token-verify.service';

describe('TokenVerifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenVerifyService = TestBed.get(TokenVerifyService);
    expect(service).toBeTruthy();
  });
});
