import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trainers-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trainers-section.html',
    styleUrls: ['./trainers-section.css']
})
export class TrainersSection implements OnInit {

    trainers: any[] = [];

    @ViewChild('carousel') carousel!: ElementRef;

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit() {
        this.cargarPersonal();
    }

    cargarPersonal() {
        this.usuarioService.getPersonal().subscribe({
            next: (data) => {
                this.trainers = data.map((p: any) => ({
                    clave_personal: p.clave_personal,
                    name: p.nombre_completo,
                    puesto: p.puesto,
                    description: p.descripcion ?? '',
                    image: p.ruta_imagen
                        ? `${environment.apiUrl}/${p.ruta_imagen}`
                        : 'assets/no-image.png'
                }));
            }
        });
    }

    scrollLeft() {
        this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }

    scrollRight() {
        this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
}
