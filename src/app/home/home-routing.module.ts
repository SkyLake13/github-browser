import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorComponent } from './home.component';

const routes: Routes = [
  { path: '', component: NavigatorComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigatorRoutingModule { }
