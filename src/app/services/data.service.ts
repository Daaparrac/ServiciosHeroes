import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { heroesModel } from '../models/heroes';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private url = 'https://heroes-32664.firebaseio.com/';

  constructor(private _http: HttpClient) {}

  getHeroes() {
    return this._http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArregloHeroe));
  }
  getHeroe(id) {
    return this._http.get(`${this.url}/heroes/${id}.json`);
  }

  putheroe(heroe: heroesModel) {
    const HeroeTemp = {
      ...heroe,
    };
    delete HeroeTemp.id_heroe;
    return this._http.put(
      `${this.url}/heroes/${heroe.id_heroe}.json`,
      HeroeTemp
    );
  }

  postheroe(heroe: heroesModel) {
    return this._http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id_heroe = resp.name;
        return heroe;
      })
    );
  }
  private crearArregloHeroe(heroe: object) {
    const heroes: heroesModel[] = [];
    if (heroe === null) {
      return [];
    }

    Object.keys(heroe).forEach((key) => {
      const heroes2: heroesModel = heroe[key];
      heroes2.id_heroe = key;
      heroes.push(heroes2);
    });
    return heroes;
  }
}
