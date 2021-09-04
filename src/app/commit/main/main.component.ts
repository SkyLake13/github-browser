import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, switchMap, takeWhile } from 'rxjs/operators';

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
    this.route.paramMap.pipe(map((params) => params.get('repoName')))
      .pipe(filter((param) => param !== null && param !== undefined))
      .pipe(switchMap((param) => this.searchService.getCommits(param ?? '')))
      .pipe(map((commits) => commits.map((c) => ({
        name: c.commit.author.name,
        url: c.commit.url,
        message: c.commit.message
      }))))
    .subscribe((commits) => { this.rows = commits; });
  }

  public async search(text: string) {
    const res = await this.searchService.searchRepositories(text).toPromise();
    this.rows = res.items;
  }

}
