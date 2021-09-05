import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchService } from './github-service.interface';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../injection-tokens';
import { RepositoryResponse } from '../dtos/repository-search.response';
import { CommitSearchResponse } from '../dtos/commit-search.response';
import { IssuesSearchResponse } from '../dtos/issue-search.response';
import { GetCommitResponse } from '../dtos/get-commit.response';

const REPOSITORIES_SEARCH_URL = 'search/repositories';
const COMMITS_SEARCH_URL = 'search/commits';
const ISSUE_PR_SEARCH_URL = 'search/issues';

@Injectable()
export class GitHubService implements SearchService {
  constructor(
    private readonly httpClient: HttpClient, 
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }
  
  public searchRepositories(query: string, page: number): Observable<RepositoryResponse> {
    const url = concatUrl(this.baseUrl, REPOSITORIES_SEARCH_URL);
    const params = createSearchRepositoriesQuery(query, page);

    return this.httpClient.get<RepositoryResponse>(url, {params});
  }

  public searchCommits(query: string, page: number) {
    const url = concatUrl(this.baseUrl, COMMITS_SEARCH_URL);
    const params = createSearchRepositoriesQuery(query, page);

    const headers = new HttpHeaders().set('accept', 'application/vnd.github.cloak-preview+json');

    return this.httpClient.get<CommitSearchResponse>(url, {params, headers});
  }

  public getCommits(repoFullName: string, page: number): Observable<GetCommitResponse[]> {
    const path = getCommitsPath(repoFullName);
    const url = concatUrl(this.baseUrl, path);

    const params = createPageQuery(page);

    return this.httpClient.get<GetCommitResponse[]>(url, {params});
  }

  public searchIssues(query: string, page: number) {
    const url = concatUrl(this.baseUrl, ISSUE_PR_SEARCH_URL);
    const params = createSearchRepositoriesQuery(query, page);

    return this.httpClient.get<IssuesSearchResponse>(url, {params});
  }
}

function createSearchRepositoriesQuery(query: string, page: number) {
  return new HttpParams()
              .set('per_page', 30)
              .set('page', page)
              .set('order', 'desc')
              .set('q', query)
}

function createPageQuery(page: number) {
  return new HttpParams()
              .set('per_page', 30)
              .set('page', page)
}

function concatUrl(baseUrl: string, path: string) {
  return baseUrl + path;
}

function getCommitsPath(repoFullName: string) {
  return `repos/${repoFullName}/commits`;
}

