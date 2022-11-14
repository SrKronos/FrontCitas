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
    let fecha: Date = new Date();
    let fechaInicio = "2021-10-25";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getMilliseconds()+"";
    let fechaFinal = "2021-10-27";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" 23:59:59.000";    
    //console.log("Fecha Actual:"+fechaactual);
    this.servicio.getJson("http://localhost/wsCitasMedicas/citas.php?fechaInicio=" + fechaInicio + "&fechaFinal=" + fechaFinal).subscribe((res: any) => {
      this.listaDoctores = res;
    });
  }

  ngOnInit(): void {
    this.obtenerDoctores();
  }

  recargarLista(): void {
    setInterval(() => {
      console.log("Cargando Doctores...");
      this.listaDoctores= [];
      this.obtenerDoctores()
    }, 60000);//cada 10min 60000
  }
}

class Doctores {
  nombre: string = '';
  especialidad: string = '';
}
