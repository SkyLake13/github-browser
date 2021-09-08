import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Commit } from '../../interfaces';

import { DataTableComponent } from './data-table.component';

describe('CommitDataTableComponent', () => {
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
    const expected = ['url', 'name', 'message'];
    expect(component.columns.every((c) => expected.includes(c))).toBeTruthy();
  });

  it('should render data', () => {    
    const data: Commit[] = [
      {
        url: 'https://www.github.com',
        name: 'Github',
        message: 'This is github.'
      },
      {
        url: 'https://www.google.com',
        name: 'Google',
        message: 'This is Google.'
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
