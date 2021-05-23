import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeEnCoursPageRoutingModule } from './commande-en-cours-routing.module';

import { CommandeEnCoursPage } from './commande-en-cours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeEnCoursPageRoutingModule
  ],
  declarations: [CommandeEnCoursPage]
})
export class CommandeEnCoursPageModule {}
