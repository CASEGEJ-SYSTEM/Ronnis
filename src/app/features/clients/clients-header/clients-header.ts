import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-clients-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './clients-header.html',
    styleUrl: './clients-header.css',
})
export class ClientsHeader {
    constructor(private router: Router) { }

    logout() {
        // Simulación de volver a la página del login al cerrar sesión
        this.router.navigate(['/auth/login']);
    }
}