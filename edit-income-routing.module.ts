import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditIncomePage } from './edit-income.page';

const routes: Routes = [
  {
    path: '',
    component: EditIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditIncomePageRoutingModule {}
