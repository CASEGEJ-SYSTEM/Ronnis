import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
    selector: 'app-clients-stats',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './clients-stats.html',
    styleUrl: './clients-stats.css'
})
export class ClientsStats implements OnInit {
    user: any;

    constructor(
        private route: ActivatedRoute,
        private mockData: MockDataService
    ) { }

    ngOnInit() {
        // Aquí se obtiene el id del usuario desde la ruta
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
            // Búsqueda simulada
            this.user = this.mockData.getUsers().find(u => u.id === +userId);
        }
    }
}