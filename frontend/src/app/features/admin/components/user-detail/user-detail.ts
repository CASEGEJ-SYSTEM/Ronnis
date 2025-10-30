import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './user-detail.html',
    styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
    user: any;

    constructor(
        private route: ActivatedRoute,
        private mockData: MockDataService
    ) { }

    ngOnInit() {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
            // En una app real, aquí llamarías a this.mockData.getUserById(+userId)
            this.user = this.mockData.getUsers().find(u => u.id === +userId);
        }
    }
}