import { AfterViewInit, ChangeDetectionStrategy, 
  ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { RepositoryFilterComponent } from '../filter/filter.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { RepositoriesResult, Repository } from '../../interfaces';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SearchComponent)
  public searchComponent!: SearchComponent;

  @ViewChild(RepositoryFilterComponent)
  public filterComponent!: RepositoryFilterComponent;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public repos = new RepositoriesResult();
  public filteredRepos = new RepositoriesResult();

  public dataSource: Repository[] | undefined;

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

  public ngAfterViewInit() {
    this.bindSearchEvent();
    this.bindLanguageSelectionEvent();
    this.bindMinStarsChangeEvent();

    this.paginator.page
      .pipe(tap((page) => this.page = page.pageIndex + 1))
      .pipe(switchMap(() => this.repositoryService.search(this.searchText, this.page)))
      .pipe(tap((repos) => this.repos = new RepositoriesResult(repos.count, repos.items)))
      .pipe(tap(() => this.dataSource = this.repos.items))
      .subscribe(() => this.cdr.markForCheck());
  }

  public rowClick(row: Repository) {
    this.router.navigate(['commits', row.name])
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private bindMinStarsChangeEvent() {
    this.filterComponent.minStars
      .pipe(tap((ms) => {
        ms ? this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items?.filter((repo) => repo.stars >= ms))
           : this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items)
      }))
      .pipe(tap(() => this.dataSource = this.filteredRepos.items))
      .subscribe(() => this.cdr.markForCheck());
  }

  private bindLanguageSelectionEvent() {
    this.filterComponent.selectLanguages
      .pipe(tap((languages) => this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items?.filter((repo) => languages.includes(repo.language)))))
      .pipe(tap(() => this.dataSource = this.filteredRepos.items?.length === 0 ? this.repos.items : this.filteredRepos.items))
      .subscribe(() => this.cdr.markForCheck());
  }

  private bindSearchEvent() {
    this.searchComponent.search
      .pipe(tap((text) => this.searchText = text))
      .pipe(switchMap(() => this.repositoryService.search(this.searchText, this.page)))
      .pipe(tap((repos) => this.repos = new RepositoriesResult(repos.count, repos.items)))
      .pipe(tap(() => this.dataSource = this.repos.items))
      .subscribe(() => this.cdr.markForCheck());
  }

  private subscriptions = new Subscription();
  private searchText!: string;
  private page = 1;
}
