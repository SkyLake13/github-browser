import { Component, Inject, OnInit } from '@angular/core';

import { SearchService, SEARCH_SERVICE } from '../../shared';

@Component({
  selector: 'app-commit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchService: SearchService
  ) { }

  ngOnInit(): void {

  }

}
