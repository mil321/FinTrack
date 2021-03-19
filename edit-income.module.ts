import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditIncomePageRoutingModule } from './edit-income-routing.module';

import { EditIncomePage } from './edit-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditIncomePageRoutingModule
  ],
  declarations: [EditIncomePage]
})
export class EditIncomePageModule {}
