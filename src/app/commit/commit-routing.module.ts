import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { REPO_NAME_PARAM } from './constants';

const routes: Routes = [
  { path: '', component: CommitListComponent, pathMatch: 'full' },
  { path: `:${REPO_NAME_PARAM}`, component: CommitListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitRoutingModule { }
