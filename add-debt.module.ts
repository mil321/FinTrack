import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDebtPageRoutingModule } from './add-debt-routing.module';

import { AddDebtPage } from './add-debt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDebtPageRoutingModule
  ],
  declarations: [AddDebtPage]
})
export class AddDebtPageModule {}
