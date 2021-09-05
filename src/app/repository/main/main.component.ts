import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryTableDataSource } from '../data-table/data-source';
import { Repository } from '../interfaces';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [RepositoryTableDataSource]
})
export class MainComponent {
  /* public get languages() {
    return this.repos.map((r) => r.language);
  }

  // stargazers_count
  public get stars() {
    return this.repos.map((r) => r.stars);
  } */

  constructor(
    public readonly dataSource: RepositoryTableDataSource,
    private readonly router: Router
  ) { }

  public async search(text: string) {
    console.log(text);
    this.dataSource.search(text).subscribe()
  }

  public rowClick(row: Repository) {
      this.router.navigate(['commits', row.name])
  }
}
