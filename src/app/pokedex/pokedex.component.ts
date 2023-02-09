import { Component, OnInit } from '@angular/core';
import { PokeApiService, PokedexInterface, PokemonEntriesInterface } from '../poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokeList: PokemonEntriesInterface[] = []
  constructor ( private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.getPokedexObservable().subscribe((pokedex: PokedexInterface[])=>{
      this.onPokedex(pokedex[pokedex.length - 1])
    })  
  }

  private onPokedex(pokedex: PokedexInterface){
    if(!pokedex) this.pokeApiService.getPokedex();
    this.pokeList = pokedex.pokemon_entries
  }

}
