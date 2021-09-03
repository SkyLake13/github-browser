import { TestBed } from '@angular/core/testing';

import { GitHubSearchService } from './search.service';

describe('GithubService', () => {
  let service: GitHubSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
