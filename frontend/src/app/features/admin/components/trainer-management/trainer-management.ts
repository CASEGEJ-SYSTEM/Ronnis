import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { RouterModule } from '@angular/router'; 

@Component({
    selector: 'app-trainer-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './trainer-management.html',
})
export class TrainerManagement implements OnInit {
    trainersData: any[] = [];
    constructor(private mockData: MockDataService) { }

    ngOnInit() {
        this.trainersData = this.mockData.getTrainers();
    }
}