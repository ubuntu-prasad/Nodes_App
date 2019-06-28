import { TestBed } from '@angular/core/testing';

import { TokenProviderService } from './token-provider.service';

describe('TokenProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenProviderService = TestBed.get(TokenProviderService);
    expect(service).toBeTruthy();
  });
});
