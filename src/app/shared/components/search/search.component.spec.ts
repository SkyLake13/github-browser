import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SearchComponent } from './search.component';
import { Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let subscription = new Subscription();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should emit search text', (done: DoneFn) => {
    const input = 'facebook';

    const subs =  component.search.subscribe((searchText) => {
      expect(searchText).toBe(input);

      done();
    });
    subscription.add(subs);

    const textBox = fixture.debugElement.query(By.css('input'));
    textBox.nativeElement.value = input;
    textBox.triggerEventHandler('input', { target: textBox.nativeElement });
    fixture.detectChanges();
  });
});
