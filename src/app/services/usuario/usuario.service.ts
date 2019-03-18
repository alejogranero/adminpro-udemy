import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

token: string;
usuario: Usuario;

  constructor( public http: HttpClient,
               public router: Router ) {
    this.cargarStorage();
   }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario, recordar = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {localStorage.removeItem('email'); }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, usuario);
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


}
