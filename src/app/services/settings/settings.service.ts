import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default.css'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
    }

  }

  aplicarTema(tema: string) {
    const urlCambio = `assets/css/colors/${tema}.css`;
    this.document.getElementById('tema').setAttribute('href', urlCambio);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = urlCambio;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
