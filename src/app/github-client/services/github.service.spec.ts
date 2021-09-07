import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { API_BASE_URL } from '../injection-tokens';

import { GitHubService } from './github.service';

describe('GithubService', () => {
  let service: GitHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GitHubService,
        {
          provide: API_BASE_URL,
          useValue: 'www.git.xyz'
        }
      ]
    });
    service = TestBed.inject(GitHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
