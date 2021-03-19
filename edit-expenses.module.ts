import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExpensesPageRoutingModule } from './edit-expenses-routing.module';

import { EditExpensesPage } from './edit-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExpensesPageRoutingModule
  ],
  declarations: [EditExpensesPage]
})
export class EditExpensesPageModule {}
