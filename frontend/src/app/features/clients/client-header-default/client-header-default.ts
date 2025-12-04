import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-client-header-default',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './client-header-default.html',
    styleUrl: './client-header-default.css',
})
export class ClientHeaderDefault {

    claveUsuario = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute 
    ) {}

    ngOnInit() {
        // Leer el parámetro del padre (ClientsLayout)
        this.claveUsuario = this.route.snapshot.paramMap.get('clave_usuario') ?? '';
    }

    logout() {
        // Limpiar datos si quieres
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}
