import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService, SharedService, SettingsService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    SharedService,
    SettingsService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
