import { ChangeDetectionStrategy, Component, 
  EventEmitter, Input, Output } from '@angular/core';
import { Repository } from '../../interfaces';

@Component({
  selector: 'app-repo-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public columns = ['avatar', 'name', 'language', 'stars', 'created'];

  @Input()
  public dataSource: Repository[] = []

  @Output()
  public rowClick = new EventEmitter<Repository>();

  public click(row: Repository) {
    this.rowClick.emit(row);
  }
}
