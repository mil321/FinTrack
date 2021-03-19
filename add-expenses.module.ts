import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpensesPageRoutingModule } from './add-expenses-routing.module';

import { AddExpensesPage } from './add-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExpensesPageRoutingModule
  ],
  declarations: [AddExpensesPage]
})
export class AddExpensesPageModule {}
