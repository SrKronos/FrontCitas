import { Component } from '@angular/core';
import { ServicioCitasService } from './services/servicio-citas.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  now: Date | undefined;

  title = 'appCitas'; 
  imagenes =[
    {
      imagenSrc:'assets/imagenes/1.jpg',
      imagenAlt:'imagen 1'
    },
    {
      imagenSrc:'assets/imagenes/2.jpg',
      imagenAlt:'imagen 2'
    },
    {
      imagenSrc:'assets/imagenes/3.jpg',
      imagenAlt:'imagen 3'
    },
  ];
  public listDoctores:any = [];
  constructor(private servicio:ServicioCitasService){
  }


  ngOnInit(): void{
   this.now = new Date();
   setInterval(()=>{
    this.now = new Date();
   },1000)


  }  
}