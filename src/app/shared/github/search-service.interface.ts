import { Observable } from "rxjs";

export interface SearchService {
    searchCode(): Observable<any>
    searchCommit(): Observable<any>
}