import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CommitService } from '../commit.service';
import { Commit } from '../interfaces';

@Component({
  selector: 'app-repo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public columns = [
    { propertyName: 'name', columnName: 'Author' },
    { propertyName: 'url', columnName: 'Url' },
    { propertyName: 'message', columnName: 'Message' }
  ];

  public rows: Commit[] = [];

  constructor(
    private readonly searchService: CommitService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(filter((params) => params.has('repoName')))
      .pipe(map((params) => params.get('repoName')))
      .pipe(switchMap((repo) => this.getResults(repo)))
    .subscribe((commits) => this.rows = commits);
  }

  public search(text: string) {
    const query = this.createQuery(text);
    this.getResults(this.repo, query, 1)
      .subscribe((commits) => this.rows = commits);
  }

  private getResults(repo: string | null, query = '', page = 1) {
    if(repo) {
      this.repo = repo;
      return this.searchService.search(repo, query, page);
    }

    return of([]);
  }

  private createQuery(text: string) {
    if(this.repo) {
      return `repo:${this.repo}+${text}`;
    }

    return text;
  }

  private repo = '';
}


