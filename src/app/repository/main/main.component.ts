import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { RepositoriesResult, Repository } from '../interfaces';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SearchComponent)
  public searchComponent!: SearchComponent;

  @ViewChild(FilterComponent)
  public filterComponent!: FilterComponent;

  public repos = new RepositoriesResult();
  public filteredRepos = new RepositoriesResult();

  public dataSource: Repository[] | undefined;

  public get languages() {
    return this.repos.items?.map((_r) => _r.language);
  }

  public get stars() {
    return this.repos.items?.map((_r) => _r.stars);
  }

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly router: Router
  ) { }

  ngAfterViewInit() {
    this.bindSearchEvent();
    this.bindLanguageSelectionEvent();
    this.bindMinStarsChangeEvent();
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
      .subscribe();
  }

  private bindLanguageSelectionEvent() {
    this.filterComponent.selectLanguages
      .pipe(tap((languages) => this.filteredRepos = new RepositoriesResult(this.repos.count, this.repos.items?.filter((repo) => languages.includes(repo.language)))))
      .pipe(tap(() => this.dataSource = this.filteredRepos.items))
      .subscribe();
  }

  private bindSearchEvent() {
    this.searchComponent.search
      .pipe(switchMap((text) => this.repositoryService.search(text, 1)))
      .pipe(tap((repos) => this.repos = new RepositoriesResult(repos.count, repos.items)))
      .pipe(tap(() => this.dataSource = this.repos.items))
      .subscribe();
  }

  private subscriptions = new Subscription();
}
