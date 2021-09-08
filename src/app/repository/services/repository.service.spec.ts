import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { ApiService, API_SERVICE } from 'src/app/github-client';
import { RepositoryService } from './repository.service';

const fakeApiService = {
  searchRepositories: () => {

  }
}

describe('RepositoryService', () => {
  let service: RepositoryService;
  let apiService: ApiService;
  let subscription = new Subscription();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RepositoryService,
        {
          provide: API_SERVICE,
          useValue: fakeApiService
        }
      ]
    });
    service = TestBed.inject(RepositoryService);
    apiService = TestBed.inject(API_SERVICE);
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search repositories', (done: DoneFn) => {
    const data = {
      total_count: 1000,
      incomplete_results: false,
      items: [
        {
          full_name: 'facebook/jest',
          language: 'javascript',
          stargazers_count: 83729,
          created_at: new Date(Date.now()),
          owner: {
            avatar_url: 'https://avatars.githubusercontent.com/u/16378997?v=4'
          }
        }
      ]
    }

    const spy = spyOn<any, any>(apiService, 'searchRepositories')
                    .and.returnValue(of(data));

    const subs = service.search('', 1).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.count).toBe(1000);
      expect(res.items.length).toBe(1);
      expect(res.items.some((i) => i.name === data.items[0].full_name))
                          .toBeTruthy();

      done();
    });

    subscription.add(subs);
  });
});
