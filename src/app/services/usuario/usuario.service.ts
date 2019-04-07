import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

token: string;
usuario: Usuario;
menu: any = [];

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
    return this.http.post(url, usuario)
    .pipe(map((respuesta: any) => {
      console.log(respuesta);
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuarioDB, respuesta.menu); // puede ser respuesta.usuarioDB
      return true; }),
    catchError( (err: HttpErrorResponse) => {

        console.log(err.error.mensaje);

        sweetAlert('Error al ingresar datos', err.error.mensaje, 'error');
        return Observable.throw(err);
    }));

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    // como el usuario es un objeto, en el localstorage hay que guardarlo como string;

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario( usuario: Usuario) {

    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      sweetAlert('Usuario creado', usuario.nombre, 'success');
      return resp.usuario;
    }),
    catchError( (err: HttpErrorResponse) => {

      console.log(err.error.mensaje);
      console.log(err);

      sweetAlert(err.error.mensaje, err.error.errors.message , 'error');
      return Observable.throw(err);
  }));
  }


  actualizarUsuario(usuario: Usuario) {

    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

       if (usuario._id === this.usuario._id) {
        // Si el usuario pasado por parámetro es el mismo que está logueado...
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu );
      }

       sweetAlert('Usuario actualizado', usuario.nombre, 'success');
       return true;
    }),
    catchError( (err: HttpErrorResponse) => {

      console.log(err.error.mensaje);

      sweetAlert(err.error.mensaje, err.error.errors.message , 'error');
      return Observable.throw(err);
  }));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoSRV.subirArchivo(archivo, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          sweetAlert('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);
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
