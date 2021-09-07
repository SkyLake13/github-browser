import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then((module) => module.HomeModule) },
  { path: 'repos',  loadChildren: () => import('./repository/repository.module').then((module) => module.RepositoryModule) },
  { path: 'commits',  loadChildren: () => import('./commit/commit.module').then((module) => module.CommitModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
