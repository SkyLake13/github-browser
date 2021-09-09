import { ChangeDetectionStrategy, Component, 
  EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSlider, MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryFilterComponent {
  @Input()
  public languages!: string[] | undefined;

  @Input()
  public stars!: number[] | undefined;

  @Output()
  public languageChange = new EventEmitter<string[]>();

  @Output()
  public minStarsChange = new EventEmitter<number | null>();

  @ViewChild(MatSelect)
  public languageSelector!: MatSelect;

  @ViewChild(MatSlider)
  public starSlider!: MatSlider;

  public formatLabel(value: number) {
    if (this.max >= 5000 && value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  public languageSelectionChange(event: MatSelectChange) {
    this.languageChange.emit(event.value);
    this.clearStarsSelection();
  }

  public minStarsValueChange(event: MatSliderChange) {
    this.minStarsChange.emit(event.value);
    this.clearLanguageSelection();
  }

  public get min() {
    return this.stars && this.stars?.length > 1 ? Math.min(...this.stars) : 0;
  }

  public get max() {
    return this.stars && this.stars?.length > 1 ? Math.max(...this.stars) : 1;
  }

  public get tickInterval() {
    return Math.round((this.max - this.min) / 10);
  }

  public get steps() {
    return this.tickInterval;
  }

  public clearFilters() {
    this.clearLanguageSelection();
    this.clearStarsSelection();
  }

  private clearLanguageSelection() {
    this.languageSelector.options.forEach((opt) => opt.deselect());
  }

  private clearStarsSelection() {
    this.starSlider.value = 0;
  }
}
