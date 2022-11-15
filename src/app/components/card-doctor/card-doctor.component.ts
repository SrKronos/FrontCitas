import { Component, OnInit } from '@angular/core';
import { ServicioCitasService } from 'src/app/services/servicio-citas.service';
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
    let f: Date = new Date();
    let strifecha = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":00.000";
    let fechaInicio = strifecha;//"2022-10-28 08:00:00.000";//+fecha.getHours()+":"+fecha.getMinutes()+":00.000";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getMilliseconds()+"";
    let fechaFinal = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" 23:50:00.000";
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
