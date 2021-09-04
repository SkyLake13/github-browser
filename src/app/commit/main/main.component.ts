import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SearchService, SEARCH_SERVICE } from '../../shared';

@Component({
  selector: 'app-repo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchService: SearchService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map((params) => params.get('repoName')))
    .subscribe((param) => console.log(param));
  }

}
