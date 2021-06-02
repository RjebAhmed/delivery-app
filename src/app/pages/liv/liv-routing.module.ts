import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivPage } from './liv.page';

const routes: Routes = [
  {
    path: '',
    component: LivPage,
    children: [

      {
        path: 'profile',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: '/liv/map',
        pathMatch: 'full'
      }
    ]


  },
  ,
  {
    path: '',
    redirectTo: '/liv/map',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivPageRoutingModule { }
