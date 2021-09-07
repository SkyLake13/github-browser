import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Commit } from '../../interfaces';

@Component({
  selector: 'app-commit-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public columns = ['url', 'name', 'message'];

  @Input()
  public dataSource: Commit[] = []
}
