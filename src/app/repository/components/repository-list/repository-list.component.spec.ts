import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { RepositoryListComponent } from './repository-list.component';


const fakeRepoService = {
  getCommits: () => {

  },
  searchCommits: () => {

  }
}

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
