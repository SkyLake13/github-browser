import { Observable } from "rxjs";
import { CommitSearchResponse } from "../dtos/commit-search.response";
import { IssuesSearchResponse } from "../dtos/issue-search.response";
import { RepositoryResponse } from "../dtos/repository-search.response";

export interface SearchService {
    searchRepositories(text: string): Observable<RepositoryResponse>;
    searchCommits(query: string): Observable<CommitSearchResponse>;
    searchIssues(query: string): Observable<IssuesSearchResponse>;
}