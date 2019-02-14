import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document ) { }

  ngOnInit() {
  }

  cambiarColor(color: string, link: any) {
    console.log(color);
    this.aplicarCheck(link);
    const urlCambio = `assets/css/colors/${color}.css`;
    this.document.getElementById('tema').setAttribute('href', urlCambio);
  }

  aplicarCheck(link: any) {
      const selectores: any = document.getElementsByClassName('selector');
      for (const ref of selectores) {
        ref.classList.remove('working');
      }
      link.classList.add('working');
  }

}
