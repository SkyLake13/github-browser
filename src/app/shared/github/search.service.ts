import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search-service.interface';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class GitHubSearchService implements SearchService {
  constructor(
    private readonly httpClient: HttpClient, 
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }

  public searchCode(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  public searchCommit(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
