import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroeComponent } from './heroe/heroe.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'inicio',
    component: HeroesComponent,
  },
  {
    path: 'heroe/:id',
    component: HeroeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
