import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitRoutingModule } from './commit-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CommitRoutingModule
  ]
})
export class CommitModule { }
