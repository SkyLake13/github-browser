import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryResponse } from 'src/app/shared/dtos/repository.response';

import { SearchService, SEARCH_SERVICE } from '../../shared';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 
  public rows?: Observable<any>;

  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchService: SearchService
  ) { }

  ngOnInit(): void {
    
  }

  public search(text: string) {
    this.rows = this.searchService.searchRepositories(text);
  }
}
