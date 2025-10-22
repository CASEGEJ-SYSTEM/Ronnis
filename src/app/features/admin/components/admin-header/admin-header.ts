import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-admin-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './admin-header.html',
    styleUrl: './admin-header.css',
})
export class AdminHeader {
    constructor(private router: Router) { }

    logout() {
        // Simulación de volver a la página del login al cerrar sesión
        this.router.navigate(['/auth/login']);
    }
}