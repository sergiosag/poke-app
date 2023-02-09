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

export interface PokeFinderInterface {
  name: string;
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

  protected pokeFinderObservable: IObservable<PokeFinderInterface[]> = {}
  protected pokeFinderDataStore: IDataStore<PokeFinderInterface[]> = {}
  protected pokeFinderBehaviourSubjets: IBehaviorSubjects<PokeFinderInterface[]> = {}

  constructor(private http: HttpClient) { }


  // pokedex functions

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
  
  protected nextPokedex(section: string): void {
    this.pokedexBehaviourSubjets[section].next(
      Object.assign({}, this.pokedexDataStore)[section],
    );
  }

  public getPokedexObservable(section = 'standard'): Observable<PokedexInterface[]> {
    this.pokedexCheckSection(section);
    return this.pokedexObservable[section];
  }

  // finder functions
  // https://pokeapi.co/api/v2/pokemon-species

  getPokeFinder(pokeid: string,section = 'standard'){
    this.pokeFinderDataStore[section]= []
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeid}`).subscribe(
      (response) => {
        this.pokeFinderDataStore[section].push(response as PokeFinderInterface)
        this.nextPokeFinder(section)
      },
      (error) =>{
        console.log(error)
      }
    )
  }
  protected pokeFinderCheckSection(section = 'standard', forze = false) {
    if (forze || !this.pokeFinderDataStore[section]) {
      this.pokeFinderDataStore[section] = [] as PokeFinderInterface[];

      this.pokeFinderBehaviourSubjets[section] = new BehaviorSubject(
        this.pokeFinderDataStore[section],
      ) as BehaviorSubject<PokeFinderInterface[]>;    

      this.pokeFinderObservable[section] = this.pokeFinderBehaviourSubjets[section].asObservable();
    }
    return true;
  }

  protected nextPokeFinder(section: string): void {
    this.pokeFinderBehaviourSubjets[section].next(
      Object.assign({}, this.pokeFinderDataStore)[section],
    );

  }

  public getPokeFinderObservable(section = 'standard'): Observable<PokeFinderInterface[]> {
    this.pokeFinderCheckSection(section);
    return this.pokeFinderObservable[section];
  }

}
