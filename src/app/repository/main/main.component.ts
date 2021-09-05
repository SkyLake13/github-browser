import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RepositoryTableDataSource } from '../data-table/data-source';
import { Repository } from '../interfaces';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [RepositoryTableDataSource]
})
export class MainComponent implements OnDestroy {

  public get languages$() {
    return this.dataSource.languages$
  }

  public get stars$() {
    return this.dataSource.stars$;
  }

  constructor(
    public readonly dataSource: RepositoryTableDataSource,
    private readonly router: Router
  ) { }
  
  public async search(text: string) {
    this.subscriptions.add(this.dataSource.search(text).subscribe());
  }

  public rowClick(row: Repository) {
      this.router.navigate(['commits', row.name])
  }

  public onLanguageSelect(languages: string[]) {
    this.dataSource.filterByLangauges(languages);
  }

  public onMinStarsChange(minStarCount: number | null) {
    this.dataSource.filterByMinStarsCount(minStarCount);
  }

  public ngOnDestroy(): void {
    this.dataSource.disconnect();
    this.subscriptions.unsubscribe();
  }

  private subscriptions = new Subscription();
}
