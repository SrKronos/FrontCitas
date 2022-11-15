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
    let f: Date = new Date();
    let strifecha = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":00.000";
    let fechaInicio = strifecha;//"2022-10-28 08:00:00.000";//+fecha.getHours()+":"+fecha.getMinutes()+":00.000";//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getMilliseconds()+"";
    let fechaFinal = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" 23:50:00.000";
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
