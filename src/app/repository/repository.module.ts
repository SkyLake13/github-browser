import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { RepositoryRoutingModule } from './repository-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared';
import { RepositoryService } from './repository.service';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    MainComponent,
    DataTableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSliderModule
  ],
  providers: [RepositoryService]
})
export class RepositoryModule { }
