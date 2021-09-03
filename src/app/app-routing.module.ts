import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'repos',  loadChildren: () => import('./repository/repository.module').then((module) => module.RepositoryModule) },
  { path: 'commits',  loadChildren: () => import('./commit/commit.module').then((module) => module.CommitModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
