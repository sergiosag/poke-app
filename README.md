# PokeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

Uses [PokeApi](pokeapi.co/) to collect the data.
App divided in two primary screens:
- Pokedex: Displays the list of all pokemon in the Kanto region.
- Buscador: Allows users to find any of the pokemon in the Kanto region using on their number as search param

And finally a third screen that displays pokemon details. You can access to this by clicking on any pokemon form the pokedex's list or in the searcher, once you do de search clicking on "Mas informacion..."

## Install project

Run `npm install --legacy-peer-deps` for install all the project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Before running test, maybe you need to set "CHROME_BIN" env variable. Used `export CHROME_BIN=/snap/bin/chromium` on Ubuntu 20.


Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
