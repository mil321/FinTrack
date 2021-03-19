import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDebtPage } from './edit-debt.page';

const routes: Routes = [
  {
    path: '',
    component: EditDebtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDebtPageRoutingModule {}
