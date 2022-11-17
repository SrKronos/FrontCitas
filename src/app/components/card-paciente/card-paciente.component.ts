import { Component, OnInit, Input } from '@angular/core';
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
  listaPacientes: any = [];
  constructor(private servicio: ServicioCitasService, private datepipe: DatePipe) { }

  public obtenerPacientes() {
    moment.locale("es");
    const hoy = moment();//.format('YYYY-MM-DD HH:MM:SS');
    const tardesito = hoy.clone().add(30,'minutes');
    const formato = 'YYYY-MM-DD hh:mm:ss';
    const fechaInicio = hoy.format(formato);
    const fechaFinal = tardesito.format(formato);
    let urlws = "http://localhost/wsCitasMedicas/citas.php?doctor="+this.nombredoctor+"&fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal;
    this.servicio.getJson(urlws).subscribe((res: any) => {
      this.listaPacientes = res;
  });
  }

  ngOnInit(): void {
    //this.obtenerPacientes();
    this.recargarLista();
  }

  recargarLista(): void {
    this.obtenerPacientes();    
    setInterval(() => {
      console.log("Cargando Pacientes...");
      this.listaPacientes = [];
      this.obtenerPacientes()
    }, 900000); //900000=15min
  }


}
