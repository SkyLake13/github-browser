import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchService } from './github-service.interface';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../injection-tokens';
import { RepositoryResponse } from '../dtos/repository.response';
import { CommitResponse } from '../dtos/commit.response';
import { CommitSearchResponse } from '../dtos/commit-search.response';

const REPOSITORIES_SEARCH_URL = 'search/repositories';
const COMMITS_SEARCH_URL = 'search/commits';

@Injectable()
export class GitHubService implements SearchService {
  constructor(
    private readonly httpClient: HttpClient, 
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }
  
  public searchRepositories(query: string): Observable<RepositoryResponse> {
    const url = concatUrl(this.baseUrl, REPOSITORIES_SEARCH_URL);
    const params = createSearchRepositoriesQuery(new HttpParams(), query);

    return this.httpClient.get<RepositoryResponse>(url, {params});
  }

  public getCommits(repoFullName: string): Observable<CommitResponse[]> {
    const path = getCommitsPath(repoFullName);
    const url = concatUrl(this.baseUrl, path);

    const params = createPageQuery(new HttpParams());

    return this.httpClient.get<CommitResponse[]>(url, {params});
  }

  public searchCommits(query: string) {
    const url = concatUrl(this.baseUrl, COMMITS_SEARCH_URL);
    const params = createSearchRepositoriesQuery(new HttpParams(), query);

    const headers = new HttpHeaders().set('accept', 'application/vnd.github.cloak-preview+json');

    return this.httpClient.get<CommitSearchResponse>(url, {params, headers});
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
