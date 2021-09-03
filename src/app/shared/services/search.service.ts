import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchService } from './search-service.interface';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../injection-tokens';

const REPOSITORIES_SEARCH_URL = 'search/repositories';

@Injectable()
export class GitHubSearchService implements SearchService {
  constructor(
    private readonly httpClient: HttpClient, 
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }
  
  public searchRepositories(text: string): Observable<any> {
    const url = concatUrl(this.baseUrl, REPOSITORIES_SEARCH_URL);
    const params = createQuery(text);

    return this.httpClient.get(url, {params});
  }

  public searchCommits(text: string): Observable<any> {
    const url = concatUrl(this.baseUrl, REPOSITORIES_SEARCH_URL);
    const params = createQuery(text);

    return this.httpClient.get(url, {params});
  }
}

function createQuery(query: string, page: number = 1) {
  return new HttpParams()
              .set('order', 'desc')
              .set('per_page', 30)
              .set('page', page)
              .set('q', query)
}

function concatUrl(baseUrl: string, path: string) {
  return baseUrl + path;
}
