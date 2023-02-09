import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokeApiService, PokeFinderInterface } from '../poke-api.service';

@Component({
  selector: 'app-poke-finder',
  templateUrl: './poke-finder.component.html',
  styleUrls: ['./poke-finder.component.scss']
})
export class PokeFinderComponent implements OnInit {
  public searchForm!: FormGroup;
  public showError: boolean | undefined;
  public pendingRequest: boolean = false;
  public pokemonName: string | undefined;
  constructor(private pokeApiService: PokeApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.pokeApiService.getPokeFinderObservable().subscribe(
      (response: PokeFinderInterface[]) => this.onPokemonFinded(response[response.length - 1])
    )
  }

  private onPokemonFinded(pokemon: PokeFinderInterface){
    if(!pokemon) return;
    this.pendingRequest = false;
    this.pokemonName = pokemon.name;
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      search: [null, Validators.compose([Validators.required, Validators.max(151), Validators.min(1)])]
    }
    )
  }

  onSubmit() {
    this.pendingRequest = true;
    if (!this.searchForm?.valid) {
      this.showError = true;
      this.pendingRequest = false;
      return;
    }
    this.showError = false;
    this.pokeApiService.getPokeFinder(this.searchForm.value.search)
  }
}
