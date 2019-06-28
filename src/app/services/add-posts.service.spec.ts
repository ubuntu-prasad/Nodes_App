import { TestBed } from '@angular/core/testing';

import { AddPostsService } from './add-posts.service';

describe('AddPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPostsService = TestBed.get(AddPostsService);
    expect(service).toBeTruthy();
  });
});
