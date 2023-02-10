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

export interface PokeDetailsInterface {
  id: string;
  name: string;
  types: TypesInterface[];
  height: number;
  weight: number;
  sprites: SpritesInterface;
}

export interface SpritesInterface {
  back_default: string;
  front_default: string;
}

export interface TypesInterface {
  slot: number;
  type: {
    name: string;
  }
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

export interface ErrorServiceInterface {
  id?: string;
  payload?: any;
  section?: string;
  statusCode?: number;
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

  protected pokeDetailsObservable: IObservable<PokeDetailsInterface[]> = {}
  protected pokeDetailsDataStore: IDataStore<PokeDetailsInterface[]> = {}
  protected pokeDetailsBehaviourSubjets: IBehaviorSubjects<PokeDetailsInterface[]> = {}


  private dataStore: {
    standard: ErrorServiceInterface[];
  } = {standard: []};
  private behaviorSubjects: {
    standard: BehaviorSubject<ErrorServiceInterface[]>;
  } = { 
    standard: new BehaviorSubject(
      this.dataStore['standard'],
    ) as BehaviorSubject<ErrorServiceInterface[]>
  };
  private observable: {
    standard: Observable<ErrorServiceInterface[]>;
  } = {standard: this.behaviorSubjects['standard'].asObservable()};

  constructor(private http: HttpClient) { }


  // Error functions
  private checkSection(){
    this.dataStore['standard'] = [] as ErrorServiceInterface[];
      this.behaviorSubjects['standard'] = new BehaviorSubject(
        this.dataStore['standard'],
      ) as BehaviorSubject<ErrorServiceInterface[]>;
      this.observable['standard'] = this.behaviorSubjects['standard'].asObservable();
  }

  private next(){
    this.behaviorSubjects['standard'].next(
      Object.assign({}, this.dataStore)['standard'],
    );
  }

  getObservableError(){
    this.checkSection();
    return this.observable['standard'];
  }
  // pokedex functions

  public getPokedex(section = 'standard') {
    this.dataStore['standard'] = []
    this.http.get('https://pokeapi.co/api/v2/pokedex/2').subscribe(
      (response) => {
        this.pokedexDataStore[section].push(response as PokedexInterface)
        this.nextPokedex(section)
      },
      (error) => {
        this.dataStore['standard'].push(error as ErrorServiceInterface)
        this.next()
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

  public getPokeFinder(pokeid: string, section = 'standard') {
    this.pokeFinderDataStore[section] = []
    this.dataStore['standard'] = []
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeid}`).subscribe(
      (response) => {
        this.pokeFinderDataStore[section].push(response as PokeFinderInterface)
        this.nextPokeFinder(section)
      },
      (error) => {
        this.dataStore['standard'].push(error as ErrorServiceInterface)
        this.next()
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

  // details functions

  public getPokeDetails(name: string, section = 'standard') {
    this.pokeDetailsDataStore[section] = []
    this.dataStore['standard'] = []
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe(
      (response) => {
        this.pokeDetailsDataStore[section].push(response as PokeDetailsInterface)
        this.nextPokeDetails(section)
      },
      (error) => {
        this.dataStore['standard'].push(error as ErrorServiceInterface)
        this.next()
      }
    )
  }

  protected pokeDetailsCheckSection(section = 'standard', forze = false) {
    if (forze || !this.pokeDetailsDataStore[section]) {
      this.pokeDetailsDataStore[section] = [] as PokeDetailsInterface[];

      this.pokeDetailsBehaviourSubjets[section] = new BehaviorSubject(
        this.pokeDetailsDataStore[section],
      ) as BehaviorSubject<PokeDetailsInterface[]>;

      this.pokeDetailsObservable[section] = this.pokeDetailsBehaviourSubjets[section].asObservable();
    }
    return true;
  }

  protected nextPokeDetails(section: string): void {
    this.pokeDetailsBehaviourSubjets[section].next(
      Object.assign({}, this.pokeDetailsDataStore)[section],
    );

  }

  public getPokeDetailsObservable(section = 'standard'): Observable<PokeDetailsInterface[]> {
    this.pokeDetailsCheckSection(section);
    return this.pokeDetailsObservable[section];
  }

}
