import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Repository } from '../../interfaces';

import { DataTableComponent } from './data-table.component';

describe('RepositoryDataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have given columns', () => {
    const expected = ['avatar', 'name', 'language', 'stars', 'created'];
    expect(component.columns.every((c) => expected.includes(c))).toBeTruthy();
  });

  it('should render data', () => {    
    const data: Repository[] = [
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4',
        name: 'node/express',
        language: 'C',
        stars: 100,
        createdAt: new Date(Date.now())
      },
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16378997?v=4',
        name: 'facebook/jest',
        language: 'C++',
        stars: 100,
        createdAt: new Date(Date.now())
      }
    ];

    component.dataSource = data;
    fixture.detectChanges();

    const nameCells = fixture.debugElement.queryAll(By.css('.name-cell'));

    expect(nameCells).toBeDefined();
    expect(nameCells.length).toBe(3);

    const nameTextContents = nameCells.map((cell) => cell.nativeElement.textContent)
                                      .filter((tc:string) => tc !== 'Name');
    expect(nameTextContents.every((tc) => data.map((d) => d.name).includes(tc))).toBeTruthy();
  });
});
