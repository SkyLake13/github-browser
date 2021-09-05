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
  constructor(
    public readonly dataSource: RepositoryTableDataSource,
    private readonly router: Router
  ) { }

  public async search(text: string) {
    this.dataSource.search(text).subscribe()
  }

  public rowClick(row: Repository) {
      this.router.navigate(['commits', row.name])
  }
}
