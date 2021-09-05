import { Observable } from "rxjs";
import { CommitSearchResponse } from "../dtos/commit-search.response";
import { GetCommitResponse } from "../dtos/get-commit.response";
import { IssuesSearchResponse } from "../dtos/issue-search.response";
import { RepositoryResponse } from "../dtos/repository-search.response";

export interface SearchService {
    searchRepositories(text: string, page: number): Observable<RepositoryResponse>;
    searchCommits(query: string, page: number): Observable<CommitSearchResponse>;
    searchIssues(query: string, page: number): Observable<IssuesSearchResponse>;
    getCommits(repoFullName: string, page: number): Observable<GetCommitResponse[]>;
}