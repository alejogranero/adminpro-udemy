import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient,
              public usuarioSRV: UsuarioService) { }

  cargarMedicos() {
    const url = `${URL_SERVICIOS}/medico`;
    return this.http.get(url);
  }

  cargarMedico( id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get(url).pipe(map( (respuesta: any) => {
      return respuesta.medico; }));
  }

  buscarMedicos(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url)
    .pipe(map( (resp: any) => {
      return resp.medicos;
    }));
  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}/?token=${this.usuarioSRV.token}`;
    return this.http.delete(url).pipe(map(resp => {
      sweetAlert('Médico borrado', 'Médico elimnado correctamente' , 'success');
      return resp;
    }));
  }

  guardarMedico( medico: Medico) {

   if (medico._id) { // actualizando
    const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioSRV.token}`;
    return this.http.put(url, medico).pipe(map( (resp: any) => {
      sweetAlert('Médico actualizado', 'Datos de ' + medico.nombre + ' ingresados correctamente' , 'success');
      return resp.medico;
    }));

   } else { // creando
    const url = `${URL_SERVICIOS}/medico?token=${this.usuarioSRV.token}`;
    return this.http.post(url, medico).pipe(map((resp: any) => {
      sweetAlert('Médico creado', 'Datos de ' + medico.nombre + ' ingresados correctamente' , 'success');
      return resp.medico;
    }));
    }
  }


}
