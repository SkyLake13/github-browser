import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderChange, MatSliderModule } from '@angular/material/slider';

import { RepositoryFilterComponent } from './filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RepositoryFilterComponent', () => {
  let component: RepositoryFilterComponent;
  let fixture: ComponentFixture<RepositoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, MatSliderModule, NoopAnimationsModule],
      declarations: [ RepositoryFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should bind and emit selected language', (done: DoneFn) => {
    const languages = ['C', 'C++'];;
    component.languages = languages;

    fixture.detectChanges();

    component.languageChange.subscribe((languages) => {
      expect(languages).toBeTruthy();
      expect(languages.length).toBe(1);
      expect(languages[0]).toEqual(languages[0]);

      done();
    });

    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('.mat-option'));
    option.nativeElement.click();
    fixture.detectChanges();
  });

  it('should should bind and emit minimum stars', (done: DoneFn) => {
    component.stars = [10, 20, 30, 40, 50, 60];
    fixture.detectChanges();

    component.minStarsChange.subscribe((stars) => {
      expect(stars).toBe(60);
      done();
    });

    const silderChangeEvent = new MatSliderChange();
    silderChangeEvent.value = 60;

    component.minStarsValueChange(silderChangeEvent)
    fixture.detectChanges();
  });

  it('should should set min and max stars', () => {
    component.stars = [10, 20, 30, 40, 50, 60];
    fixture.detectChanges();

    expect(component.min).toBe(10);
    expect(component.max).toBe(60);
  });

  it('should should set steps', () => {
    component.stars = [10, 20, 30, 40, 50, 60];
    fixture.detectChanges();

    expect(component.steps).toBe(5);
  });
});
