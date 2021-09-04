import { Observable } from "rxjs";
import { RepositoryResponse } from "../dtos/repository.response";

export interface SearchService {
    searchRepositories(text: string): Observable<RepositoryResponse>
    searchCommits(text: string): Observable<any>
}