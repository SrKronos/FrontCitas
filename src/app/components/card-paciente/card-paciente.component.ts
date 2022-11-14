import { Component, OnInit, Input } from '@angular/core';
import { ServicioCitasService } from 'src/app/services/servicio-citas.service';
import { DatePipe } from '@angular/common';

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
    let fecha: Date = new Date();
    let fechaInicio = "2021-10-25";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getMilliseconds()+"";
    let fechaFinal = "2021-10-27";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" 23:59:59.000";   
    let urlws = "http://localhost/wsCitasMedicas/citas.php?doctor="+this.nombredoctor+"&fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal;
    console.log("URL:"+urlws);
    this.servicio.getJson(urlws).subscribe((res: any) => {
      this.listaPacientes = res;
  });
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  recargarLista(): void {    
    setInterval(() => {
      console.log("Cargando Pacientes...");
      this.listaPacientes = [];
      this.obtenerPacientes()
    }, 6000); //5 minutos  30000
  }


}
