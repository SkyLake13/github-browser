import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { REPO_NAME_PARAM } from '../../constants';
import { CommitsResult, Commit } from '../../interfaces';
import { CommitService } from '../../services/commit.service';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitListComponent implements OnInit, OnDestroy {
  public commits = new CommitsResult(0, []);

  constructor(
    private readonly commitService: CommitService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.getCommitsByUrlParam();
  }

  public searchTextChange(searchText: string) {
    this.query = searchText;
    this.search(this.query);
  }

  public pageChange(pageEvent: PageEvent) {
    if(this.isSearch) {
      this.searchCommits(this.repo, this.query, pageEvent.pageIndex + 1)
      .pipe(this.bind())
      .subscribe(() => this.cdr.markForCheck());
    } else {
      this.getCommits(this.repo, pageEvent.pageIndex + 1)
      .pipe(this.bind())
      .subscribe(() => this.cdr.markForCheck());
    }
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getCommitsByUrlParam() {
    const subscription = this.route.paramMap
      .pipe(filter((params) => params.has(REPO_NAME_PARAM)))
      .pipe(map((params) => params.get(REPO_NAME_PARAM)))
      .pipe(tap((repo) => this.repo = repo ?? ''))
      .pipe(switchMap(() => this.getCommits(this.repo)))
      .pipe(this.bind())
      .subscribe(() => this.cdr.markForCheck());

    this.subscriptions.add(subscription);
  }

  private search(searchText: string) {
    if (searchText) {
      const query = this.createQuery(searchText);
      const subs = this.searchCommits(this.repo, query)
        .pipe(this.bind())
        .subscribe(() => this.cdr.markForCheck());
      this.subscriptions.add(subs);
      this.isSearch = true;
    } else {
      const subs = this.getCommits(this.repo)
        .pipe(this.bind())
        .subscribe(() => this.cdr.markForCheck());
      this.subscriptions.add(subs);

      this.isSearch = false;
    }
  }

  private searchCommits(repo: string, query: string, page = 1) {
    return this.commitService.searchCommits(repo, query, page)
  }

  private getCommits(repo: string, page = 1) {
    return this.commitService.getCommits(repo, page)
  }

  private createQuery(text: string) {
    return this.repo ? `repo:${this.repo}+${text}` : text;
  }

  private bind() {
    return tap((commits: { count: number, items: Commit[] }) => this.commits = new CommitsResult(commits.count, commits.items));
  }

  private repo!: string;
  private query!: string;
  private subscriptions = new Subscription();
  private isSearch = false;
}


