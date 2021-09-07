import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CommitsResult, Commit } from '../../interfaces';
import { CommitService } from '../../services/commit.service';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitListComponent implements OnInit, OnDestroy {
  public commits = new CommitsResult();

  public dataSource: Commit[] | undefined

  constructor(
    private readonly commitService: CommitService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const subscription = this.route.paramMap
      .pipe(filter((params) => params.has('repoName')))
      .pipe(map((params) => params.get('repoName')))
      .pipe(tap((repo) => this.repo = repo ?? ''))
      .pipe(switchMap(() => this.getCommits(this.repo ?? '')))
      .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
      .pipe(tap(() => this.dataSource = this.commits.items))
      .subscribe(() => this.cdr.markForCheck());

    this.subscriptions.add(subscription);
  }

  public search(text: string) {
    this.query = text;
    if (text) {
      const query = this.createQuery(text);
      const subs = this.searchCommits(this.repo ?? '', query)
                        .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
                        .pipe(tap(() => this.dataSource = this.commits.items))
                        .subscribe(() => this.cdr.markForCheck());
                        this.subscriptions.add(subs);
        this.isSearching = true;
    } else {
      const subs = this.getCommits(this.repo ?? '')
                  .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
                  .pipe(tap(() => this.dataSource = this.commits.items))
                  .subscribe(() => this.cdr.markForCheck());
      this.subscriptions.add(subs);

      this.isSearching = false;
    }
  }

  searchCommits(repo: string, query: string, page = 1) {
    return this.commitService.search(repo, query, page)
  }

  getCommits(repo: string, page = 1) {
    return this.commitService.getCommits(repo, page)
  }

  public pageChange(pageEvent: PageEvent) {
    if(this.isSearching) {
      this.searchCommits(this.repo, this.query, pageEvent.pageIndex + 1)
      .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
      .pipe(tap(() => this.dataSource = this.commits.items))
      .subscribe(() => this.cdr.markForCheck());
    } else {
      this.getCommits(this.repo, pageEvent.pageIndex + 1)
      .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
      .pipe(tap(() => this.dataSource = this.commits.items))
      .subscribe(() => this.cdr.markForCheck());
    }
  }


  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private createQuery(text: string) {
    if (this.repo) {
      return `repo:${this.repo}+${text}`;
    }

    return text;
  }

  private repo!: string;
  private query!: string;

  private subscriptions = new Subscription();

  private isSearching = false;
}


