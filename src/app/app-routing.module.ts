import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { PokeFinderComponent } from './poke-finder/poke-finder.component';
import { PokedexComponent } from './pokedex/pokedex.component';

const routes: Routes = [{
  path: '',
  component: PokedexComponent,
},
{
  path: 'pokedex',
  component: PokedexComponent,
},
{
  path: 'pokefinder',
  component: PokeFinderComponent,
},
{
  path: 'details/:pokeid',
  component: PokeDetailsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
