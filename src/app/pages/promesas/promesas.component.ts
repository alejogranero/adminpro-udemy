import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then( (mensaje) => console.log('Todo ok', mensaje)).catch( error => console.error('Termino con errores', error));
  }

  ngOnInit() {
  }


  contarTres() {
    const promesa = new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('OK');
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;
  }
}
