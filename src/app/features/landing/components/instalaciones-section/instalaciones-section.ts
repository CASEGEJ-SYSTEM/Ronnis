import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstalacionesService } from '../../../../core/services/instalaciones.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-instalaciones-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instalaciones-section.html',
  styleUrls: ['./instalaciones-section.css'],
})
export class InstalacionesSection implements OnInit {

  instalaciones: any[] = [];

  @ViewChild('carousel') carousel!: ElementRef;

  constructor(private instalacionesService: InstalacionesService) {}

  ngOnInit() {
    this.cargarInstalaciones();
  }

  cargarInstalaciones() {
    this.instalacionesService.getInstalaciones().subscribe({
      next: (data) => {
        this.instalaciones = data.map(e => ({
          clave_instalaciones: e.clave_instalaciones,
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
