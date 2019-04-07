import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  termino: string;

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) {
    activatedRoute.params.subscribe( params => {
      this.termino = params.termino;
      this.buscar(this.termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    return this.http.get(url).subscribe( (resp: any) => {

      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      console.log(this.usuarios);
    });
  }

}
