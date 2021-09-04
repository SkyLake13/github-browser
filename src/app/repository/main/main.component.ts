import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchService, SEARCH_SERVICE } from '../../shared';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 
  public columns = [
    { propertyName: 'name', columnName: 'Repo name' },
    { propertyName: 'avatar_url', columnName: 'Avatar' },
    { propertyName: 'created_at', columnName: 'Created at' }
  ];

  public rows: any = [];

  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchService: SearchService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    
  }

  public async search(text: string) {
    const res = await this.searchService.searchRepositories(text).toPromise();
    this.rows = res.items;
  }

  public rowClick(row: any) {
      this.router.navigate(['commits', row.full_name])
  }
}
