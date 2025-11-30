import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventosService } from '../../../../core/services/eventos.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html',
})
export class Events implements OnInit {

  eventsData: {
    clave_eventos: string;
    titulo: string;
    description: string;
    image: string;
  }[] = [];

  sede = localStorage.getItem('sede') ?? '';

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  constructor(private eventsService: EventosService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventsService.getEventos(this.sede).subscribe({
      next: (data) => {
        if (!Array.isArray(data)) {
          console.error("El backend NO regresó un array:", data);
          this.eventsData = [];
          return;
        }

        this.eventsData = data.map((p: any) => ({
          clave_eventos: p.clave_eventos,
          titulo: p.titulo,
          description: p.descripcion ?? '',
          image: p.ruta_imagen
            ? `${environment.apiUrl}/${p.ruta_imagen}`
            : 'assets/no-image.png'
        }));
      },
      error: (err) => console.error(err)
    });
  }

  scrollLeft() {
    if (this.carousel)
      this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    if (this.carousel)
      this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  eliminar(clave: string) {
    if (!confirm("¿Eliminar este Evento?")) return;

    this.eventsService.eliminarEventos(clave).subscribe({
      next: () => {
        this.eventsData = this.eventsData.filter(ev => ev.clave_eventos !== clave)
      },
      error: (err) => console.error(err)
    });
  }
}
