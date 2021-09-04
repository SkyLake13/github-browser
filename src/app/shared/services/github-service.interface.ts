import { Observable } from "rxjs";
import { CommitSearchResponse } from "../dtos/commit-search.response";
import { CommitResponse } from "../dtos/commit.response";
import { RepositoryResponse } from "../dtos/repository.response";

export interface SearchService {
    searchRepositories(text: string): Observable<RepositoryResponse>
    getCommits(text: string): Observable<CommitResponse[]>
    searchCommits(query: string): Observable<CommitSearchResponse>
}