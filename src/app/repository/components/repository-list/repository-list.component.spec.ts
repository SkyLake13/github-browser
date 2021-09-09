import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { RepositoryService } from '../../services/repository.service';
import { RepositoryListComponent } from './repository-list.component';

const searchReposResponsePage_1 = {
  count: 1000,
  items: [
    {
      name: 'facebook/jest',
      language: 'javascript',
      stars: 83729,
      createdAt: new Date(Date.now()),
      avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4'
    },
    {
      name: 'facebook/react',
      language: 'typescript',
      stars: 282011,
      createdAt: new Date(Date.now()),
      avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4'
    }
  ]
}

const searchReposResponsePage_2 = {
  count: 1000,
  items: [
    {
      name: 'facebook/jest',
      language: 'javascript',
      stars: 83729,
      createdAt: new Date(Date.now()),
      avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4'
    },
    {
      name: 'facebook/react',
      language: 'typescript',
      stars: 282011,
      createdAt: new Date(Date.now()),
      avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4'
    },
    {
      name: 'facebook/react',
      language: 'typescript',
      stars: 282011,
      createdAt: new Date(Date.now()),
      avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4'
    }
  ]
}

const fakeRepoService = {
  search: () => of()
}

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let service: RepositoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [ RepositoryListComponent ],
      providers: [
        {
          provide: RepositoryService,
          useValue: fakeRepoService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RepositoryService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search reposiotries', () => {
    const spy = spyOn<any, any>(service, 'search')
                  .and.returnValue(of(searchReposResponsePage_1));

    component.searchTextChange('facebook');
    fixture.detectChanges();

    expect(component.repos.count).toBe(1000);
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(2);
  });

  it('should navigate to commits route', () => {
    spyOn<any, any>(service, 'search')
                  .and.returnValue(of(searchReposResponsePage_1));

    const routerSpy = spyOn(router, 'navigate');

    component.searchTextChange('facebook');
    fixture.detectChanges();
    component.tableRowClick(searchReposResponsePage_1.items[0]);
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['commits', 'facebook/jest']);
  });

  it('should filter by language', () => {
    const spy = spyOn<any, any>(service, 'search')
                  .and.returnValue(of(searchReposResponsePage_1));

    component.searchTextChange('facebook');
    fixture.detectChanges();
    component.languageSelectionChange(['javascript']);
    fixture.detectChanges();

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].language).toBe('javascript');
  });

  it('should filter by stars', () => {
    const spy = spyOn<any, any>(service, 'search')
                  .and.returnValue(of(searchReposResponsePage_1));

    component.searchTextChange('facebook');
    fixture.detectChanges();

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(2);

    component.minimumStarsValueChange(200000);
    fixture.detectChanges();

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].language).toBe('typescript');
  });

  it('should fetch next page of searched reposiotries', () => {
    const spy = spyOn<any, any>(service, 'search')
                  .and.returnValue(of(searchReposResponsePage_1));

    component.searchTextChange('facebook');
    fixture.detectChanges();

    expect(component.repos.count).toBe(1000);
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(2);

    spy.and.returnValue(of(searchReposResponsePage_2));

    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 1;
    component.pageChange(pageEvent);
    fixture.detectChanges();

    expect(component.repos.count).toBe(1000);
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.length).toBe(3);
  });
});
