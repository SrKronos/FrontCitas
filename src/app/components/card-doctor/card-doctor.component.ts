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
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const formato = 'YYYY-MM-DD hh:mm:ss';
    const fechaInicio = hoy.format(formato);
    const fechaFinal = tardesito.format(formato);
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

