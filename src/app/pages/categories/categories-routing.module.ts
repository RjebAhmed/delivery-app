import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'fastfood',
    loadChildren: () => import('./fastfood/fastfood.module').then(m => m.FastfoodPageModule)
  },
  {
    path: 'facture',
    loadChildren: () => import('./facture/facture.module').then(m => m.FacturePageModule)
  },
  {
    path: 'medicament',
    loadChildren: () => import('./medicament/medicament.module').then(m => m.MedicamentPageModule)
  },
  {
    path: 'fruits',
    loadChildren: () => import('./fruits/fruits.module').then(m => m.FruitsPageModule)
  },
  {
    path: 'vegetables',
    loadChildren: () => import('./vegetables/vegetables.module').then(m => m.VegetablesPageModule)
  },
  {
    path: 'produit-alimentaire',
    loadChildren: () => import('./produit-alimentaire/produit-alimentaire.module').then(m => m.ProduitAlimentairePageModule)
  },
  {
    path: 'cigarette',
    loadChildren: () => import('./cigarette/cigarette.module').then(m => m.CigarettePageModule)
  },
  {
    path: 'cafe',
    loadChildren: () => import('./cafe/cafe.module').then(m => m.CafePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule { }
