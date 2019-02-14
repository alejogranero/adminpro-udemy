import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Servicios
import {SharedService} from './services/shared.service';
import {SidebarService} from './services/sidebar.service';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [SidebarService, SharedService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
