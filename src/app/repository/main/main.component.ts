import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repository } from '../interfaces';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent { 
  public columns = [
    { propertyName: 'name', columnName: 'Repo name' },
    { propertyName: 'avatarUrl', columnName: 'Avatar' },
    { propertyName: 'createdAt', columnName: 'Created at' }
  ];

  public rows: Repository[] = [];

  public get languages() {
    return this.rows.map((r) => r.language);
  }

  // stargazers_count
  public get stars() {
    return this.rows.map((r) => r.stars);
  }

  constructor(
    private readonly repoService: RepositoryService,
    private readonly router: Router
  ) { }

  public async search(text: string) {
    this.repoService.search(text, 1).subscribe((res) => {
      this.rows = res;
    });
  }

  public rowClick(row: any) {
      this.router.navigate(['commits', row.full_name])
  }
}
