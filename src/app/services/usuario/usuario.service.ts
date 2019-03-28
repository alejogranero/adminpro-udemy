import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

token: string;
usuario: Usuario;

  constructor( public http: HttpClient,
               public router: Router,
               public subirArchivoSRV: SubirArchivoService ) {
     this.cargarStorage();
   }

  estaLogueado() {
    return  (this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
        localStorage.removeItem('email');
      }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuarioDB); // puede ser respuesta.usuarioDB
      return true;
    }));

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // como el usuario es un objeto, en el localstorage hay que guardarlo como string;

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario( usuario: Usuario) {

    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      sweetAlert('Usuario creado', usuario.nombre, 'success');
      return resp.usuario;
    }));
  }

  actualizarUsuario(usuario: Usuario) {

    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

       if (usuario._id === this.usuario._id) {
        // Si el usuario pasado por parámetro es el mismo que está logueado...
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB );
      }

       sweetAlert('Usuario actualizado', usuario.nombre, 'success');
       return true;
    }));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoSRV.subirArchivo(archivo, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          sweetAlert('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch(resp => {
          console.log(resp);
        });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this.http.get(url)
    .pipe(map( (resp: any) => {
      return resp.usuarios;
    }));
  }

  borrarUsuario( id: string) {
    const url = `${URL_SERVICIOS}/usuario/${id}/?token=${this.token}`;
    return this.http.delete(url).pipe(map( resp => {
      sweetAlert('Usuario borrado', 'El usuario eliminado correctamente', 'success');
      return true;
    } ));
  }

}
