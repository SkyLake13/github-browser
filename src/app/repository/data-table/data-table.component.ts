import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Repository } from '../interfaces';

@Component({
  selector: 'app-repo-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public columns = ['avatar', 'name', 'language', 'stars', 'created'];

  public _dataSource = new MatTableDataSource<Repository>();

  @Input()
  public set dataSource(value: Repository[] | undefined) {
    this._dataSource = new MatTableDataSource(value)
  }

  @Output()
  public rowClick = new EventEmitter<Repository>();

  public click(row: Repository) {
    this.rowClick.emit(row);
  }
}
