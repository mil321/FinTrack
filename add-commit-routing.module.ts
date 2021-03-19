import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCommitPage } from './add-commit.page';

const routes: Routes = [
  {
    path: '',
    component: AddCommitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCommitPageRoutingModule {}
