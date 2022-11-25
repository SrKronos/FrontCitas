import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ServicioCitasService } from 'src/app/services/servicio-citas.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.css']
})
export class CardPacienteComponent implements OnInit {
  @Input() nombredoctor: string = "";
  @Output() numeroPacientes = new EventEmitter<number>();
  listaPacientes: any = [];
  constructor(private servicio: ServicioCitasService, private datepipe: DatePipe) { }
  
  public obtenerPacientes() {
    moment.locale("es");
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const antesito = hoy.clone().subtract(30,'minutes');
    const formato = 'YYYY-MM-DD hh:mm:ss';
    const fechaInicio = antesito.format(formato);
    const fechaFinal = tardesito.format(formato);
    let urlws = "http://localhost/wsCitasMedicas/citasg.php?doctor="+this.nombredoctor+"&fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal;
    this.servicio.getJson(urlws).subscribe((res: any) => {
    this.listaPacientes = res;
    this.enviarNPacientes();
  });
  }

  public ObtenerPacientesAsync(){
    this.listaPacientes = this.recargarLista();
  }

  recargarLista = async ()=>{
    moment.locale("es");
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const antesito = hoy.clone().subtract(30,'minutes');
    const formato = 'YYYY-MM-DD HH:mm:ss';
    const fechaInicio = antesito.format(formato);
    const fechaFinal = tardesito.format(formato);
    let respuesta = await (await fetch("http://localhost/wsCitasMedicas/citasg.php?doctor="+this.nombredoctor+"&fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal)).json();
    this.listaPacientes = respuesta;
} 

  ngOnInit(): void {
    this.ObtenerPacientesAsync();
    setInterval(()=>{
      this.listaPacientes=[];
      this.recargarLista();
    },100000);
  }

  enviarNPacientes(){
    this.numeroPacientes.emit(this.listaPacientes.length);
  }

  /*
  recargarLista(): void {
    setInterval(() => {
      console.log("Cargando Pacientes...");
      this.listaPacientes = [];
      this.obtenerPacientes()
    }, 1500); //900000=15min
  }
  
  */
}
