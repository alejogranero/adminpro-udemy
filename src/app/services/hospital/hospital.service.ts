import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;

  constructor(public http: HttpClient,
              public subirArchivoSRV: SubirArchivoService,
              public usuarioSRV: UsuarioService) { }

  cargarHospitales() {
    const url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url);
  }

  obtenerHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url).pipe(map( (resp: any) => {
      return resp.hospital;
    }));
  }

  borrarHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioSRV.token}`;
    return this.http.delete(url).pipe(map(() => {
      sweetAlert('El hospital ha sido borrado', 'Eliminado correctamente' , 'success');
      return true;
    }));
  }

  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.hospitales;
    }));
  }

  crearHospital( nombre: string) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioSRV.token}`;
    return this.http.post(url, {nombre}).pipe(map( (resp: any) => {
      sweetAlert('Hospital creado', nombre + ' ingresado al sistema', 'success');
      return resp.hospital;
    }));

  }

  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.usuarioSRV.token}`;
    return this.http.put(url, hospital).pipe(map( (resp: any) => {
      sweetAlert('Hospital actualizado', hospital.nombre , 'success');
      return resp.hospital;
    }));
  }

}
