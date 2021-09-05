import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { CommitRoutingModule } from './commit-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared';
import { DataTableComponent } from './data-table/data-table.component';
import { CommitService } from './commit.service';



@NgModule({
  declarations: [
    MainComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    CommitRoutingModule,
    SharedModule,
    MatTableModule
  ],
  providers: [CommitService]
})
export class CommitModule { }
