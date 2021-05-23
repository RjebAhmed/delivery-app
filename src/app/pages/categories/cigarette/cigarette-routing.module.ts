import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CigarettePage } from './cigarette.page';

const routes: Routes = [
  {
    path: '',
    component: CigarettePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CigarettePageRoutingModule {}
