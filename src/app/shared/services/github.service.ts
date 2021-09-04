import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchService } from './github-service.interface';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../injection-tokens';
import { RepositoryResponse } from '../dtos/repository.response';
import { CommitResponse } from '../dtos/commit.response';

const REPOSITORIES_SEARCH_URL = 'search/repositories';

@Injectable()
export class GitHubService implements SearchService {
  constructor(
    private readonly httpClient: HttpClient, 
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }
  
  public searchRepositories(text: string): Observable<RepositoryResponse> {
    const url = concatUrl(this.baseUrl, REPOSITORIES_SEARCH_URL);
    const params = createSearchRepositoriesQuery(new HttpParams(), text);

    return this.httpClient.get<RepositoryResponse>(url, {params});
  }

  public getCommits(repoFullName: string): Observable<CommitResponse[]> {
    const path = getCommitsPath(repoFullName);
    const url = concatUrl(this.baseUrl, path);

    const params = createPageQuery(new HttpParams());

    return this.httpClient.get<CommitResponse[]>(url, {params});
  }
}

function createSearchRepositoriesQuery(httpParams: HttpParams, query: string, page: number = 1) {
  return httpParams
              .set('per_page', 30)
              .set('page', page)
              .set('order', 'desc')
              .set('q', query)
}

function createPageQuery(httpParams: HttpParams, page: number = 1) {
  return httpParams
              .set('per_page', 30)
              .set('page', page)
}

function concatUrl(baseUrl: string, path: string) {
  return baseUrl + path;
}

function getCommitsPath(repoFullName: string) {
  return `repos/${repoFullName}/commits`;
}
