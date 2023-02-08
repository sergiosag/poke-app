import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface PokedexInterface {
  pokemon_entries: PokemonEntriesInterface[];
}

export interface PokemonEntriesInterface {
  entry_number: string;
  pokemon_species: PokeResumeInterface;
}

export interface PokeResumeInterface {
  name: string;
  url: string;
}

export interface IObservable<T> {
  [key: string]: Observable<T>;
}

interface IDataStore<T> {
  [key: string]: T;
}

interface IBehaviorSubjects<T> {
  [key: string]: BehaviorSubject<T>;
}


@Injectable({
  providedIn: 'root'
})

export class PokeApiService {
  protected pokedexObservable: IObservable<PokedexInterface[]> = {}
  protected pokedexDataStore: IDataStore<PokedexInterface[]> = {}
  protected pokedexBehaviourSubjets: IBehaviorSubjects<PokedexInterface[]> = {}

  constructor(private http: HttpClient) { }


  protected pokedexCheckSection(section = 'standard', forze = false) {
    if (forze || !this.pokedexDataStore[section]) {
      this.pokedexDataStore[section] = [] as PokedexInterface[];

      this.pokedexBehaviourSubjets[section] = new BehaviorSubject(
        this.pokedexDataStore[section],
      ) as BehaviorSubject<PokedexInterface[]>;    

      this.pokedexObservable[section] = this.pokedexBehaviourSubjets[section].asObservable();
    }
    return true;
  }

  getPokedex(section = 'standard'){
    this.http.get('https://pokeapi.co/api/v2/pokedex/2').subscribe(
      (response) => {
        this.pokedexDataStore[section].push(response as PokedexInterface)
        this.nextPokedex(section)
      },
      (error) =>{
        console.log(error)
      }
    )
  }

  protected nextPokedex(section: string): void {
    this.pokedexBehaviourSubjets[section].next(
      Object.assign({}, this.pokedexDataStore)[section],
    );

    this.pokedexBehaviourSubjets[section].next(
      Object.assign({}, this.pokedexDataStore)[section],
    );
  }

  public getPokedexObservable(section = 'standard'): Observable<PokedexInterface[]> {
    this.pokedexCheckSection(section);
    return this.pokedexObservable[section];
  }

}
