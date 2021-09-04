import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {

  @Input()
  public columns: any[] = [];

  @Input()
  public data = [];

  @Output()
  public rowClick = new EventEmitter<number>();

  public rowClicked(row: any) {
    this.rowClick.emit(row);
  }

  public getData(row: any, header: any) {
    return row[header.propertyName];
  }

}
