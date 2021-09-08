import { AfterViewInit, ChangeDetectionStrategy, 
  Component, ElementRef, EventEmitter, 
  OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @Output()
  public search = new EventEmitter<string>();

  public ngAfterViewInit() {
    this.subscription = searchEvent(this.searchTextBox?.nativeElement)
    .subscribe((value) => {
      this.search.emit(value);
    });
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @ViewChild('search') 
  private searchTextBox?: ElementRef;

  private subscription?: Subscription;
}

function searchEvent(htmlElement: HTMLElement) {
  return fromEvent(htmlElement, 'input')
    .pipe(debounceTime(300))
    .pipe(map((event: any) => event.target.value))
}
