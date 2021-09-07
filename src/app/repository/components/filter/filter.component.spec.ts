import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryFilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: RepositoryFilterComponent;
  let fixture: ComponentFixture<RepositoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
