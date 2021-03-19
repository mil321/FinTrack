import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIncomePageRoutingModule } from './add-income-routing.module';

import { AddIncomePage } from './add-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIncomePageRoutingModule
  ],
  declarations: [AddIncomePage]
})
export class AddIncomePageModule {}
