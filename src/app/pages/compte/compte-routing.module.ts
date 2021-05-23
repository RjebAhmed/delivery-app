import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComptePage } from './compte.page';

const routes: Routes = [
  {
    path: '',
    component: ComptePage
  },
  {
    path: 'commande-en-cours',
    loadChildren: () => import('./commande-en-cours/commande-en-cours.module').then( m => m.CommandeEnCoursPageModule)
  },
  {
    path: 'mes-commandes',
    loadChildren: () => import('./mes-commandes/mes-commandes.module').then( m => m.MesCommandesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'avis',
    loadChildren: () => import('./avis/avis.module').then( m => m.AvisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComptePageRoutingModule {}
