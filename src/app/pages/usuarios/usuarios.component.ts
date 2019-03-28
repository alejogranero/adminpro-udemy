import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var sweetAlert: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})



export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public usuarioSRV: UsuarioService,
               public modalSRV: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalSRV.notificacion
      .subscribe( resp => {
        this.cargarUsuarios();
      });
  }

  mostrarModal(id: string) {
    this.modalSRV.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioSRV.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });
  }

  cambiarDesde( num: number) {

    const desde = this.desde + num;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += num;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioSRV.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    if (usuario._id === this.usuarioSRV.usuario._id) {
      sweetAlert('No se puede borrar', 'No se puede borrar a sí mismo', 'error');
      return;
    }

    sweetAlert({
      title: 'Esta seguro?',
      text: 'Este seguro de borrar a ' + usuario.nombre + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {

      if (borrar) {
        this.usuarioSRV.borrarUsuario(usuario._id).subscribe((borrado: boolean) => {
          this.cargarUsuarios();
        });
      }
    });
    }

    guardarUsuario(usuario: Usuario) {
      this.usuarioSRV.actualizarUsuario(usuario).subscribe();
    }

}
