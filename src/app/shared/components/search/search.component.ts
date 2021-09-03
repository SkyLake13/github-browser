import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @Output()
  public search = new EventEmitter<string>();

  @ViewChild('search') 
  private searchTextBox?: ElementRef;

  public ngAfterViewInit() {
    fromEvent(this.searchTextBox?.nativeElement, 'input')
      .pipe(debounceTime(300))
      .pipe(map((event: any) => event.target.value))
      .subscribe((value) => {
        this.search.emit(value);
      })
  }
}
