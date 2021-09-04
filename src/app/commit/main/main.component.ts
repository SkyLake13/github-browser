import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, switchMap, takeWhile, tap } from 'rxjs/operators';
import { CommitSearchResponse, Item } from 'src/app/shared/dtos/commit-search.response';
import { CommitResponse } from 'src/app/shared/dtos/commit.response';

import { SearchService, SEARCH_SERVICE } from '../../shared';

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

  public rows: any = [];

  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchService: SearchService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((params) => params.get('repoName')))
      .pipe(filter((repoName) => repoName !== undefined))
      .pipe(tap((repo) => this.repo = repo))
      .pipe(switchMap((repo) => this.searchService.getCommits(repo ?? '')))
      .pipe(map((commits) => commits.map(mapCommitResponse)))
    .subscribe((commits) => this.rows = commits);
  }

  public search(text: string) {
    const query = this.createQuery(text);
    this.searchService.searchCommits(query)
      .pipe(map((res) => res.items))
      .pipe(map((items) => items.map(mapCommitSearchResponse)))
      .subscribe((commits) => this.rows = commits);
  }

  private createQuery(text: string) {
    if(this.repo) {
      return `repo:${this.repo}+${text}`;
    }

    return text;
  }

  private repo: null | string | undefined;
}

function mapCommitSearchResponse(c: Item) {
  return {
    name: c.commit.author.name,
    url: c.commit.url,
    message: c.commit.message
  }
}

function mapCommitResponse(c: CommitResponse) {
  return {
    name: c.commit.author.name,
    url: c.commit.url,
    message: c.commit.message
  }
}
