import { Observable } from "rxjs";
import { CommitResponse } from "../dtos/commit.response";
import { RepositoryResponse } from "../dtos/repository.response";

export interface SearchService {
    searchRepositories(text: string): Observable<RepositoryResponse>
    getCommits(text: string): Observable<CommitResponse[]>
}