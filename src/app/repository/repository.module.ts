import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { RepositoryRoutingModule } from './repository-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared';
import { RepositoryService } from './repository.service';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [
    MainComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    SharedModule,
    MatTableModule
  ],
  providers: [RepositoryService]
})
export class RepositoryModule { }
