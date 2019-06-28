import { TestBed } from '@angular/core/testing';

import { SetFcmTokenService } from './set-fcm-token.service';

describe('SetFcmTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetFcmTokenService = TestBed.get(SetFcmTokenService);
    expect(service).toBeTruthy();
  });
});
