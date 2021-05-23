import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLivreurPage } from './add-livreur.page';

const routes: Routes = [
  {
    path: '',
    component: AddLivreurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLivreurPageRoutingModule {}
