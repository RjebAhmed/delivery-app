import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivPageRoutingModule } from './liv-routing.module';

import { LivPage } from './liv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivPageRoutingModule
  ],
  declarations: [LivPage]
})
export class LivPageModule {}
