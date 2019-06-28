import { TestBed } from '@angular/core/testing';

import { UpdateProfileInfoService } from './update-profile-info.service';

describe('UpdateProfileInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateProfileInfoService = TestBed.get(UpdateProfileInfoService);
    expect(service).toBeTruthy();
  });
});
