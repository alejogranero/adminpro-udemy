import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input('porcentaje') porcentaje: number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  onChanges(event) {


    if (event >= 100) {
      this.porcentaje = 100;
    } else if (event <= 0) {
      this.porcentaje = 0;
    } else {
    this.porcentaje = event;
  }
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);

  }


  aumentar() {
      if (this.porcentaje >= 100) {
        return;
      }
      this.porcentaje = this.porcentaje + 5;
      this.cambioValor.emit(this.porcentaje);

    }

    reducir() {
      if (this.porcentaje <= 0) {
        return;
      }
      this.porcentaje = this.porcentaje - 5;
      this.cambioValor.emit(this.porcentaje);

    }
  }


