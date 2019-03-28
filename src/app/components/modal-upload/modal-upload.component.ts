import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor( public cargaArchivoSRV: SubirArchivoService,
               public modalSRV: ModalUploadService) { }

  ngOnInit() {
  }

  subirImagen() {
    this.cargaArchivoSRV.subirArchivo( this.imagenSubir, this.modalSRV.tipo, this.modalSRV.id )
        .then( resp => {
          this.modalSRV.notificacion.emit(resp);
          this.cerrarModal();
        })
        .catch( err => {
          console.error(err);
        });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalSRV.ocultarModal();
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }


    if (archivo.type.indexOf('image') < 0) {
      sweetAlert('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

}
