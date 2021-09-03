import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule
  ]
})
export class RepositoryModule { }
