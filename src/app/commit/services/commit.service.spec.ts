import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService, API_SERVICE } from 'src/app/github-client';
import { CommitService } from './commit.service';

const fakeApiService = {
  searchCommits: () => {

  },

  getCommits: () => {

  }
}

describe('CommitService', () => {
  let service: CommitService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitService,
        {
          provide: API_SERVICE,
          useValue: fakeApiService
        }
      ]
    });
    service = TestBed.inject(CommitService);
    apiService = TestBed.inject(API_SERVICE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get commits', (done: DoneFn) => {
    const data: any[] = [
      {
        commit: {
          author: {
            name: 'abhishek'
          },
          message: 'This is github.'
        },
        html_url: 'https://www.github.com'
      },
      {
        commit: {
          author: {
            name: 'abhishek'
          },
          message: 'This is Google.'
        },
        html_url: 'https://www.google.com'
      }
    ];
    const spy = spyOn(apiService, 'getCommits').and.returnValue(of(data));

    service.getCommits('', 1).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.count).toBe(2);
      expect(res.items.length).toBe(2);
      expect(res.items.some((i) => i.message === data[0].commit.message)).toBeTruthy();

      done();
    });
  });

  it('should search commits', (done: DoneFn) => {
    const data = {
      total_count: 1000,
      incomplete_results: false,
      items: [
        {
          commit: {
            author: {
              name: 'abhishek'
            },
            message: 'This is github.'
          },
          html_url: 'https://www.github.com'
        },
        {
          commit: {
            author: {
              name: 'abhishek'
            },
            message: 'This is Google.'
          },
          html_url: 'https://www.google.com'
        }
      ]
    }
    const spy = spyOn<any, any>(apiService, 'searchCommits').and.returnValue(of(data));

    service.searchCommits('abhishek/node', 'class', 1).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.count).toBe(1000);
      expect(res.items.length).toBe(2);
      expect(res.items.some((i) => i.message === data.items[0].commit.message)).toBeTruthy();

      done();
    });
  });
});
