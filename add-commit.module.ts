import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCommitPageRoutingModule } from './add-commit-routing.module';

import { AddCommitPage } from './add-commit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCommitPageRoutingModule
  ],
  declarations: [AddCommitPage]
})
export class AddCommitPageModule {}
