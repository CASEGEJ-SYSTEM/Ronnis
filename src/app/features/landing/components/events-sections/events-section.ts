import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../../../core/services/eventos.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-events-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-section.html',
  styleUrls: ['./events-section.css'],
})
export class EventsSection implements OnInit {

  eventos: any[] = [];

  @ViewChild('carousel') carousel!: ElementRef;

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data.map(e => ({
          clave_eventos: e.clave_eventos,
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
