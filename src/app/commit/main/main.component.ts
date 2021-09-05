import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CommitTableDataSource } from '../data-table/data-source';

@Component({
  selector: 'app-repo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [CommitTableDataSource]
})
export class MainComponent implements OnInit {
  constructor(
    public readonly tableDataSource: CommitTableDataSource,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(filter((params) => params.has('repoName')))
      .pipe(map((params) => params.get('repoName')))
      .pipe(tap((repo) => this.repo = repo))
      .pipe(switchMap((repo) => this.tableDataSource.getCommits(repo ?? '')))
    .subscribe();
  }

  public search(text: string) {
    const query = this.createQuery(text);
    this.tableDataSource.searchCommits(this.repo ?? '', query).subscribe();
  }

  private createQuery(text: string) {
    if(this.repo) {
      return `repo:${this.repo}+${text}`;
    }

    return text;
  }

  private repo: string | null | undefined;
}


