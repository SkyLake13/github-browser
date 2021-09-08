import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CommitService } from '../../services/commit.service';

import { CommitListComponent } from './commit-list.component';

const getCommitReponse = {
  count: 2,
  items: [
    {
      name: 'facebook/jest',
      url: 'https://www.github.com/facebook/jest/sahskdh',
      message: 'This is one of the commits where no important changes was done.'
    },
    {
      name: 'uber/eureka',
      url: 'https://www.github.com/uber/eureka/kdjskjd',
      message: 'This is one of the commits where no important changes was done.'
    }
  ]
}

const searchCommitResponse = {
  count: 1,
  items: [
    {
      name: 'google/search',
      url: 'https://www.github.com/google/search/sahskdh',
      message: 'This is one of the commits where no important changes was done.'
    },

  ]
};

const fakeCommitService = {
  getCommits: () => of(),
  searchCommits: () => of()
}

const fakeActivatedRoute = {
  paramMap: of(convertToParamMap({
    repoName: 'facebook/jest'
  }))
}

describe('CommitListComponent', () => {
  let component: CommitListComponent;
  let fixture: ComponentFixture<CommitListComponent>;
  let activatedRoute: ActivatedRoute;
  let commitService: CommitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [CommitListComponent],
      providers: [
        {
          provide: CommitService,
          useValue: fakeCommitService
        },
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitListComponent);
    component = fixture.componentInstance;
    commitService = TestBed.inject(CommitService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get commits by -repoName- URL param', () => {
    const serviceSpy = spyOn(commitService, 'getCommits')
      .and.returnValue(of(getCommitReponse));
    fixture.detectChanges();

    expect(component.commits.items.length).toBe(2);
    expect(component.commits.count).toBe(2);
  });

  it('should search commits by -repoName- and search text', () => {
    spyOn(commitService, 'getCommits')
      .and.returnValue(of(getCommitReponse));

    const serviceSpy = spyOn(commitService, 'searchCommits')
      .and.returnValue(of(searchCommitResponse));

    fixture.detectChanges();

    component.searchTextChange('google');
    fixture.detectChanges();

    expect(component.commits.items.length).toBe(1);
    expect(component.commits.count).toBe(1);
  });

  it('should get next page of get commit results', () => {
    const serviceSpy = spyOn(commitService, 'getCommits')
      .and.returnValue(of(getCommitReponse));

    fixture.detectChanges();

    expect(component.commits.items.length).toBe(2);
    expect(component.commits.count).toBe(2);

    serviceSpy.and.returnValue(of(searchCommitResponse));

    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 1;
    component.pageChange(pageEvent);

    fixture.detectChanges();

    expect(component.commits.items.length).toBe(1);
    expect(component.commits.count).toBe(1);
  });

  it('should get next page of search commit results', () => {
    const serviceSpy = spyOn(commitService, 'searchCommits')
      .and.returnValue(of(searchCommitResponse));

    component.searchTextChange('google');

    fixture.detectChanges();

    expect(component.commits.items.length).toBe(1);
    expect(component.commits.count).toBe(1);

    serviceSpy.and.returnValue(of(getCommitReponse));

    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 1;
    component.pageChange(pageEvent);

    fixture.detectChanges();

    expect(component.commits.items.length).toBe(2);
    expect(component.commits.count).toBe(2);
    expect(serviceSpy).toHaveBeenCalledWith('facebook/jest', 'google', 2);
  });
});
