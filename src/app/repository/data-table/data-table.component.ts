import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Repository } from '../interfaces';
import { RepositoryTableDataSource } from './data-source';

@Component({
  selector: 'app-repo-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public columns = ['avatar', 'name', 'created'];

  @Input()
  public dataSource!: RepositoryTableDataSource;

  @Output()
  public click = new EventEmitter<Repository>();

  public rowClick(row: Repository) {
    this.click.emit(row);
  }
}
