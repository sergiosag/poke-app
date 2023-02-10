import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorServiceInterface, PokeApiService, PokeDetailsInterface } from '../poke-api.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent implements OnInit, OnDestroy {
  private subParams!: Subscription;
  private subDetails!: Subscription;
  private subError!: Subscription;

  public pokeId!: string;
  public pokemon!: PokeDetailsInterface;
  public spriteSrc!: string;
  public hasError = false;
  private isFront = true;

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService
  ){}

  ngOnInit() {
    this.subDetails = this.pokeApiService.getPokeDetailsObservable().subscribe((response: PokeDetailsInterface[])=>{
      this.onDetails(response[response.length - 1])
    })
    this.subError = this.pokeApiService.getObservableError().subscribe((error: ErrorServiceInterface[])=>{
      this.onError(error)
    })
    this.subParams = this.route.params.subscribe(params => {
      if(!params['pokeid']) return;
      this.pokeId = params['pokeid'];
      this.pokeApiService.getPokeDetails(this.pokeId);
    });
  }

  private onDetails(pokemon: PokeDetailsInterface){
    if(!pokemon) return;
    this.pokemon = pokemon;
    this.spriteSrc = pokemon.sprites.front_default;
  }

  private onError(error: ErrorServiceInterface[]){
    if(!!!error.length) return;
    this.hasError = true;
  }

  rotateImg(){
    if(this.isFront) this.spriteSrc = this.pokemon.sprites.back_default;
    else this.spriteSrc = this.pokemon.sprites.front_default;

    this.isFront = !this.isFront;
  }

  ngOnDestroy(): void {
    this.subDetails?.unsubscribe();
    this.subParams?.unsubscribe();
  }
}
