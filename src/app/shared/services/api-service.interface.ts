import { Observable } from "rxjs";
import { CommitSearchResponse } from "../api-response-objects/commit-search.response";
import { GetCommitResponse } from "../api-response-objects/get-commit.response";
import { IssuesSearchResponse } from "../api-response-objects/issue-search.response";
import { RepositoryResponse } from "../api-response-objects/repository-search.response";

export interface ApiService {
    searchRepositories(text: string, page: number): Observable<RepositoryResponse>;
    searchCommits(query: string, page: number): Observable<CommitSearchResponse>;
    searchIssues(query: string, page: number): Observable<IssuesSearchResponse>;
    getCommits(repoFullName: string, page: number): Observable<GetCommitResponse[]>;
}