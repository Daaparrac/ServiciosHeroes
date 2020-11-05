import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceNameService } from '../services/data.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { heroesModel } from '../models/heroes';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
})
export class HeroeComponent implements OnInit {
  id = null;
  heroe: heroesModel = new heroesModel();
  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id != 'nuevo') {
      this._data.getHeroe(this.id).subscribe((data: heroesModel) => {
        this.heroe = data;
        this.heroe.id_heroe = this.id;
      });
    }
    if (this.id == 'nuevo') {
      this.heroe.id_heroe = null;
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      title: 'espere plox',
      icon: 'info',
      text: 'guardanding',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id_heroe) {
      peticion = this._data.putheroe(this.heroe);
    } else {
      peticion = this._data.postheroe(this.heroe);
    }
    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.heroe.nombre,
        icon: 'success',
        text: 'se actualizó',
      });
    });
  }
}
