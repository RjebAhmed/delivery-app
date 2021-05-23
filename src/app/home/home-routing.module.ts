import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesPageModule)
          }
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/compte/compte.module').then(m => m.ComptePageModule)
          }
        ]
      },
      {
        path: 'panier',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/panier/panier.module').then(m => m.PanierPageModule)
          }
        ]
      },
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/accueil/accueil.module').then(m => m.AccueilPageModule)
          }
        ]
      },
      {
        path: 'aide',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/aide/aide.module').then(m => m.AidePageModule)
          }
        ]
      },
      
      
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
