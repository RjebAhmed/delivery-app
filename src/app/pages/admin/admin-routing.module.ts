import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule)
  },
  {
    path: 'validation',
    loadChildren: () => import('./validation/validation.module').then( m => m.ValidationPageModule)
  },
  {
    path: 'add-livreur',
    loadChildren: () => import('./add-livreur/add-livreur.module').then( m => m.AddLivreurPageModule)
  },
  {
    path: 'avis',
    loadChildren: () => import('./avis/avis.module').then( m => m.AvisPageModule)
  },
  {
    path: 'static',
    loadChildren: () => import('./static/static.module').then( m => m.StaticPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
