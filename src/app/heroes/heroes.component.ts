import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../services/data.service';
import { heroesModel } from '../models/heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  constructor(private _data: ServiceNameService) {}

  heroes: heroesModel[] = [];
  ngOnInit(): void {
    this._data.getHeroes().subscribe((data) => {
      console.log(data);
      this.heroes = data;
    });
  }
}
