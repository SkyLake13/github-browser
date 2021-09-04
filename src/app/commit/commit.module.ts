import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitRoutingModule } from './commit-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CommitRoutingModule,
    SharedModule
  ]
})
export class CommitModule { }
