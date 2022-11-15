import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDoctorComponent } from './components/card-doctor/card-doctor.component';
import { CardPacienteComponent } from './components/card-paciente/card-paciente.component';
import { CardListaComponent } from './components/card-lista/card-lista.component';
import { DatePipe } from '@angular/common';
import { CarruselComponent } from './components/carrusel/carrusel.component';

import LocalEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(LocalEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    CardDoctorComponent,
    CardPacienteComponent,
    CardListaComponent,
    CarruselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    CardDoctorComponent,
    CardPacienteComponent,
    CardListaComponent,
  ],
  providers: [DatePipe,{provide:LOCALE_ID,useValue:'es'}],
  bootstrap: [AppComponent]
})

export class AppModule { }
