import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var sweetAlert: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  cargando: boolean = true;
  hospitales: Hospital[] = [];
  total: number;


  constructor( public hospitalSRV: HospitalService,
               public modalSRV: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalSRV.notificacion
        .subscribe(() => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this.modalSRV.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalSRV.cargarHospitales()
        .subscribe( (resp: any) => {
          this.total = resp.total;
          this.hospitales = resp.hospitales;
          this.cargando = false;
        });
  }

buscarHospital( termino: string) {

  if (termino.length <= 0) {
    this.cargarHospitales();
    return;
  }
  this.cargando = true;
  this.hospitalSRV.buscarHospital( termino ).subscribe( (hospitales: Hospital[]) => {
    this.hospitales = hospitales;
    this.cargando = false;
  });
}

guardarHospital(hospital: Hospital) {
  this.hospitalSRV.actualizarHospital(hospital).subscribe();
}

crearHospital() {
  sweetAlert({
    title: 'Crear hospital',
    text: 'Ingrese el nombre del hospital',
    content: 'input',
    icon: 'info',
    buttons: true,
    dangerMode: true
  }).then(valor => {
    if (!valor || valor.length <= 0) {
      return;
    }

    this.hospitalSRV.crearHospital(valor).subscribe(() => this.cargarHospitales());
  });
}

borrarHospital(hospital: Hospital) {

  sweetAlert( {
    title: 'Esta seguro?',
    text: 'Este seguro de borrar a ' + hospital.nombre + '?',
    icon: 'warning',
    buttons: true,
    dangerMode: true
  }).then( borrar => {

    if (borrar) {
  this.hospitalSRV.borrarHospital(hospital._id).subscribe( () => this.cargarHospitales());
}
});
}

actualizarImagen(hospital: Hospital) {
  this.modalSRV.mostrarModal('hospitales', hospital._id);
}



}
