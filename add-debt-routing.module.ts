import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDebtPage } from './add-debt.page';

const routes: Routes = [
  {
    path: '',
    component: AddDebtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDebtPageRoutingModule {}
