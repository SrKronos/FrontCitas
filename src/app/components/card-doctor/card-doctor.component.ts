import { Component, OnInit } from '@angular/core';
import { ServicioCitasService } from 'src/app/services/servicio-citas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.css']
})
export class CardDoctorComponent implements OnInit {
  listaDoctores: any = [];


  constructor(private servicio: ServicioCitasService) {

  }

  public obtenerDoctores() {
    moment.locale("es");
    const today = moment();
    let f: Date = new Date();
    let fh: Date = new Date();
    let strifecha = f.getUTCFullYear()+"-"+f.getUTCMonth()+"-"+f.getUTCDay()+" "+f.getUTCHours()+":"+f.getUTCMinutes()+":00.000";
    let fechaInicio = today.format('YYYY-MM-DD HH:MM:SS');//
    let fechaFinal = today.format('YYYY-MM-DD HH:MM:SS');
    console.log("Fecha Desde:"+fechaInicio);
    console.log("Fecha Hasta:"+fechaFinal);
    console.log("Fecha:"+today.format('YYYY-MM-DD HH:MM:SS'));
    this.servicio.getJson("http://localhost/wsCitasMedicas/citas.php?fechaInicio=" + fechaInicio + "&fechaFinal=" + fechaFinal).subscribe((res: any) => {
      this.listaDoctores = res;
    });
  }

  ngOnInit(): void {
    this.recargarLista();
  }

  recargarLista(): void {
    this.obtenerDoctores();
    setInterval(() => {
      console.log("Cargando Doctores...");
      this.listaDoctores= [];
      this.obtenerDoctores()
    }, 1800000 );//cada 10min 900000=15min  1800000=30min
  }
}

class Doctores {
  nombre: string = '';
  especialidad: string = '';
}
