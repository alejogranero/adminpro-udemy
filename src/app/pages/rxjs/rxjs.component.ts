import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let contador = 1;
    const obs = new Observable(observer => {
      const intervalo = setInterval( () => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          clearInterval(intervalo);
          observer.error('Valor 2');
        }
      }, 1000);
    });

    obs.pipe(
      retry()
    ).subscribe(numero => console.log('Subs: ', numero),
                  error => console.error('Error en el observable', error),
                  () => console.log('El observador terminó!')) ;

  }

  ngOnInit() {
  }

}
