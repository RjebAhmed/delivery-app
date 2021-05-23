import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitAlimentairePageRoutingModule } from './produit-alimentaire-routing.module';

import { ProduitAlimentairePage } from './produit-alimentaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitAlimentairePageRoutingModule
  ],
  declarations: [ProduitAlimentairePage]
})
export class ProduitAlimentairePageModule {}
