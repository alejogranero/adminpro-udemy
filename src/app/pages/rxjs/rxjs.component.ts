import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

suscripcion: Subscription;

  constructor() {

    this.suscripcion = this.regresaObservable()
    .subscribe(numero => console.log('Subs: ', numero),
                  error => console.error('Error en el observable', error),
                  () => console.log('El observador terminó!')) ;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    const obs = new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {valor: contador};
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        /* if (contador === 2) {
          clearInterval(intervalo);
          observer.error('Valor 2');
        } */
      }, 1000);
    }).pipe(map( respuesta => respuesta.valor),
            filter((valor, index) => {
              if ((valor % 2) === 1) {
                // impar
                return true;
              } else {
                // par
                return false;
              }
            }));
    return obs;
  }

}
