import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];


  constructor( public usuarioSRV: UsuarioService) {

  }

  cargarMenu() {
    this.menu = this.usuarioSRV.menu;
  }
}
