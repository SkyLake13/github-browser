import { Observable } from "rxjs";

export interface SearchService {
    searchRepositories(text: string): Observable<any>
    searchCommits(text: string): Observable<any>
}