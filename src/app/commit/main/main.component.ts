import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CommitTableDataSource } from '../data-table/data-source';

@Component({
  selector: 'app-repo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [CommitTableDataSource]
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    public readonly tableDataSource: CommitTableDataSource,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const subscription = this.route.paramMap
      .pipe(filter((params) => params.has('repoName')))
      .pipe(map((params) => params.get('repoName')))
      .pipe(tap((repo) => this.repo = repo))
      .pipe(switchMap(() => this.tableDataSource.getCommits(this.repo ?? '')))
    .subscribe();

    this.subscriptions.add(subscription);
  }

  public search(text: string) {
    if(text) {
      const query = this.createQuery(text);
      this.subscriptions.add(this.tableDataSource.searchCommits(this.repo ?? '', query).subscribe());
    } else {
      this.subscriptions.add(this.tableDataSource.getCommits(this.repo ?? '').subscribe());
    }
  }

  public ngOnDestroy() {
    this.tableDataSource.disconnect();
    this.subscriptions.unsubscribe();
  }

  private createQuery(text: string) {
    if(this.repo) {
      return `repo:${this.repo}+${text}`;
    }

    return text;
  }

  private repo: string | null | undefined;

  private subscriptions = new Subscription();
}


