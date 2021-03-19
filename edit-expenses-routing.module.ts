import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExpensesPage } from './edit-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: EditExpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExpensesPageRoutingModule {}
