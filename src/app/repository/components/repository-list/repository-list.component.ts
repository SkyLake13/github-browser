import { ChangeDetectionStrategy, 
  ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RepositoriesResult, Repository } from '../../interfaces';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryListComponent implements OnDestroy {
  public repos = new RepositoriesResult(0, []);
  public filteredRepos = new RepositoriesResult(0, []);

  public dataSource: Repository[] = [];

  public get languages() {
    return [...new Set(this.repos.items?.map((repo) => repo.language))].sort();
  }

  public get stars() {
    return this.repos.items?.map((repo) => repo.stars);
  }

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public pageChange(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;

    this.repositoryService.search(this.searchText, this.page)
      .pipe(tap((repos) => this.repos = new RepositoriesResult(repos.count, repos.items)))
      .pipe(tap(() => this.dataSource = this.repos.items))
    .subscribe(() => this.cdr.markForCheck());    
  }

  public searchTextChange(searchText: string) {
    this.searchText = searchText;

    this.repositoryService.search(this.searchText, this.page)
    .pipe(tap((repos) => this.repos = new RepositoriesResult(repos.count, repos.items)))
    .pipe(tap(() => this.dataSource = this.repos.items))
    .subscribe(() => this.cdr.markForCheck());      
  }

  public languageSelectionChange(languages: string[]) {
    this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items?.filter((repo) => languages.includes(repo.language)));
    this.dataSource = this.filteredRepos.items?.length === 0 ? this.repos.items : this.filteredRepos.items;
    this.cdr.markForCheck();
  }

  public minimumStarsValueChange(minimumStars: number | null) {
    if(minimumStars) {
      this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items?.filter((repo) => repo.stars >= minimumStars))
    } else {
      this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items);
    }
    this.dataSource = this.filteredRepos.items;
    this.cdr.markForCheck();
  }

  public rowClick(row: Repository) {
    this.router.navigate(['commits', row.name])
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscriptions = new Subscription();
  private searchText!: string;
  private page = 1;
}
