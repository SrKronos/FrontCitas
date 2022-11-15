import { Component, OnInit, Input } from '@angular/core';

interface carouselImagenes{
  imagenSrc: string;
  imagenAlt: string;
}
@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  @Input() imagenes: carouselImagenes[] = [];
  @Input() indicadores = true;
  @Input() controles = true;
@Input() autoSlide = false;
@Input() tiempointervalo = 5000;
  selectedIndex = 0;
  constructor() { }

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImagen();
    }
  }

  autoSlideImagen():void{
    setInterval(()=>{
      this.onSiguiente();
    },this.tiempointervalo);
  }
  selectImage(index: number): void{
    this.selectedIndex = index;
  }
  onAnterior():void{
    if(this.selectedIndex ===0){
      this.selectedIndex = this.imagenes.length -1;
    }else{
      this.selectedIndex--;
    }
  }

  onSiguiente():void{
    if(this.selectedIndex === this.imagenes.length -1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }
}
