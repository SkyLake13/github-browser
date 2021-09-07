import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CommitsResult, Commit } from '../../interfaces';
import { CommitService } from '../../services/commit.service';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss']
})
export class CommitListComponent implements OnInit, OnDestroy {
  public commits = new CommitsResult();

  public dataSource: Commit[] | undefined

  constructor(
    private readonly commitService: CommitService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const subscription = this.route.paramMap
      .pipe(filter((params) => params.has('repoName')))
      .pipe(map((params) => params.get('repoName')))
      .pipe(tap((repo) => this.repo = repo))
      .pipe(switchMap(() => this.getCommits(this.repo ?? '')))
      .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
      .pipe(tap(() => this.dataSource = this.commits.items))
      .subscribe();

    this.subscriptions.add(subscription);
  }

  public search(text: string) {
    if (text) {
      const query = this.createQuery(text);
      const subs = this.searchCommits(this.repo ?? '', query)
                        .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
                        .pipe(tap(() => this.dataSource = this.commits.items))
                        .subscribe();
                        this.subscriptions.add(subs);
    } else {
      const subs = this.getCommits(this.repo ?? '')
                  .pipe(tap((commits) => this.commits = new CommitsResult(commits.count, commits.items)))
                  .pipe(tap(() => this.dataSource = this.commits.items))
                  .subscribe();
      this.subscriptions.add(subs);
    }
  }

  searchCommits(repo: string, query: string) {
    return this.commitService.search(repo, query, 1)
  }

  getCommits(repo: string) {
    return this.commitService.getCommits(repo, 1)
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

  private repo: string | null | undefined;

  private subscriptions = new Subscription();
}


