import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalesComponent } from '../hospitales/hospitales.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

hospitales: Hospital[] = [];
medico: Medico = new Medico('', '', '', '', '');
hospital: Hospital = new Hospital('');

  constructor(public medicoSRV: MedicoService, public modalSRV: ModalUploadService,
              public hospitalSRV: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {

                activatedRoute.params.subscribe( parametros => {
                  // tslint:disable-next-line:no-string-literal
                  const id = parametros['id'];

                  if (id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
              }

  ngOnInit() {
    this.hospitalSRV.cargarHospitales()
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
      });
    this.modalSRV.notificacion.subscribe( resp => {
      console.log(resp);
      this.medico.img = resp.medicoActualizado.img;
    });
  }

  guardarMedico( f: NgForm) {

    if (f.invalid) { return; }

    this.medicoSRV.guardarMedico( this.medico)
        .subscribe( medico => {
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
  }

  cambioHospital( id: string) {
    this.hospitalSRV.obtenerHospital(id).subscribe( hospital => {
      this.hospital = hospital;
    });
  }

  cargarMedico( id: string) {
    this.medicoSRV.cargarMedico(id)
    .subscribe(respuesta => {
      this.medico.hospital = respuesta.hospital._id;
      this.medico = respuesta;
      this.cambioHospital(respuesta.hospital._id);
    });
  }
  cambiarFoto() {
    this.modalSRV.mostrarModal('medicos', this.medico._id);
  }

}
