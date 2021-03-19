import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDebtPageRoutingModule } from './edit-debt-routing.module';

import { EditDebtPage } from './edit-debt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDebtPageRoutingModule
  ],
  declarations: [EditDebtPage]
})
export class EditDebtPageModule {}
