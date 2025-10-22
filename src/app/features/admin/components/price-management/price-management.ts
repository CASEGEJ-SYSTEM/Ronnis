import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
    selector: 'app-price-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './price-management.html',
})
export class PriceManagement implements OnInit {
    plansData: any[] = [];
    constructor(private mockData: MockDataService) { }

    ngOnInit() {
        this.plansData = this.mockData.getPlans();
    }
}