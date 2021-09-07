import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CommitRoutingModule } from './commit-routing.module';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { SharedModule } from '../shared';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CommitService } from './services/commit.service';



@NgModule({
  declarations: [
    CommitListComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    CommitRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [CommitService]
})
export class CommitModule { }
