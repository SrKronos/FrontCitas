import { Component, OnInit,ViewChild,ViewChildren,ElementRef,QueryList,HostListener, EventEmitter } from '@angular/core';
import { ServicioCitasService } from 'src/app/services/servicio-citas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.css']
})
export class CardDoctorComponent implements OnInit {
  listaDoctores: any = [];
  numeroitem: string = "";
  animar: string= "animar";

  constructor(private servicio: ServicioCitasService) {

  }

  public obtenerDoctores() {
    moment.locale("es");
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const antesito = hoy.clone().subtract(30,'minutes');
    const formato = 'YYYY-MM-DD HH:mm:ss';
    const fechaInicio = antesito.format(formato);
    const fechaFinal = tardesito.format(formato);
    this.servicio.getJson("http://localhost/wsCitasMedicas/citasg.php?fechaInicio=" + fechaInicio + "&fechaFinal=" + fechaFinal).subscribe((res: any) => {
      this.listaDoctores = res;
      this.numeroitem = ((10*180)*-1)+"px";
    });
  }

  public ObtenerDoctoresAsync(){
    this.listaDoctores = this.recargarLista();
  }

  recargarLista = async ()=>{
    moment.locale("es");
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const antesito = hoy.clone().subtract(30,'minutes');
    const formato = 'YYYY-MM-DD HH:mm:ss';
    const fechaInicio = antesito.format(formato);
    const fechaFinal = tardesito.format(formato);
    let respuesta = await (await fetch("http://localhost/wsCitasMedicas/citasg.php?fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal)).json();
    this.listaDoctores = respuesta;
  }
  
  ngOnInit(): void {
    this.ObtenerDoctoresAsync();
    setInterval(()=>{
      this.listaDoctores=[];
      this.recargarLista();
    },200000);
  }

  /*
  recargarLista(): void {
    this.obtenerDoctores();
    setInterval(() => {
      console.log("Cargando Doctores...");
      this.listaDoctores= [];
      this.obtenerDoctores()
    }, 1800000 );//cada 10min 900000=15min  1800000=30min
  }
*/
}

