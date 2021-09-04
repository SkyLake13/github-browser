import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorComponent } from './navigator/navigator.component';

const routes: Routes = [
  { path: '', component: NavigatorComponent, pathMatch:'full' },
  { path: 'repos',  loadChildren: () => import('./repository/repository.module').then((module) => module.RepositoryModule) },
  { path: 'commits',  loadChildren: () => import('./commit/commit.module').then((module) => module.CommitModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
