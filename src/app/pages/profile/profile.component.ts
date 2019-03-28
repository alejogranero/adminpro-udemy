import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string;
  usuario: Usuario;

  constructor( public usuarioSRV: UsuarioService) {

    this.usuario = usuarioSRV.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this.usuarioSRV.actualizarUsuario(this.usuario). subscribe();
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      sweetAlert('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }
    this.imagenSubir = archivo;

  }

  cambiarImagen() {
    this.usuarioSRV.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
