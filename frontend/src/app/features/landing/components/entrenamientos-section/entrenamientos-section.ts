import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenamientosService } from '../../../../core/services/entrenamientos.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-entrenamientos-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrenamientos-section.html',
  styleUrls: ['./entrenamientos-section.css'],
})
export class EntrenamientosSection implements OnInit {

  entrenamientos: any[] = [];

  @ViewChild('carousel') carousel!: ElementRef;

  constructor(private entrenamientosService: EntrenamientosService) {}

  ngOnInit() {
    this.cargarEntrenamientos();
  }

  cargarEntrenamientos() {
    this.entrenamientosService.getEntrenamientos().subscribe({
      next: (data) => {
        this.entrenamientos = data.map(e => ({
          clave_entrenamientos: e.clave_entrenamientos,
          titulo: e.titulo,
          descripcion: e.descripcion ?? '',
          sede: e.sede,
          imagen: e.ruta_imagen ? `${environment.apiUrl}/${e.ruta_imagen}` : 'assets/no-image.png'
        }));
      }
    });
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

}
