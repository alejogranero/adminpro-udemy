import { Component, OnInit } from '@angular/core';
import { MedicoService, UsuarioService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  numeroMedicos: number = 5;
  medicos: Medico[] = [];
  constructor( public medicoSRV: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();

  }

  cargarMedicos() {
    this.medicoSRV.cargarMedicos().subscribe((resp: any) => {
      this.numeroMedicos = resp.total;
      this.medicos = resp.medicos;
    });
  }

  buscarMedico(termino: string) {

  if (termino.length <= 0) {
    this.cargarMedicos();
    return;
  }
  this.medicoSRV.buscarMedicos(termino).subscribe((resp) => this.medicos = resp);
  }

  crearMedico() {}

  borrarMedico(medico: Medico) {
    this.medicoSRV.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
  }


}
