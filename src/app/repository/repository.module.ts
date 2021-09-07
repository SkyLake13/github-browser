import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { SharedModule } from '../shared';
import { RepositoryService } from './services/repository.service';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RepositoryFilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    RepositoryListComponent,
    DataTableComponent,
    RepositoryFilterComponent
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
