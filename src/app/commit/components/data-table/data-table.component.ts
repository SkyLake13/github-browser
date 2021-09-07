import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Commit } from '../../interfaces';

@Component({
  selector: 'app-commit-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public columns = ['url', 'name', 'message'];

  public _dataSource = new MatTableDataSource<Commit>();

  @Input()
  public set dataSource(value: Commit[] | undefined) {
    this._dataSource = new MatTableDataSource(value)
  }
}
