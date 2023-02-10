import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeApiService, PokedexInterface, PokemonEntriesInterface } from '../poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, OnDestroy {
  pokeList: PokemonEntriesInterface[] = [];
  subscription: Subscription | undefined;
  constructor ( private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
   this.subscription = this.pokeApiService.getPokedexObservable().subscribe((pokedex: PokedexInterface[])=>{
      this.onPokedex(pokedex[pokedex?.length - 1])
    })  
  }

  private onPokedex(pokedex: PokedexInterface){
    if(!pokedex) {
      this.pokeApiService.getPokedex();
      return;
    }
    this.pokeList = pokedex.pokemon_entries
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
