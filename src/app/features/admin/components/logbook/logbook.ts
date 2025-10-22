import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
    selector: 'app-logbook',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './logbook.html',
    styleUrl: './logbook.css',
})
export class Logbook implements OnInit {
    // Carga los datos de la tabla de registro
    financialLogData: any[] = [];
    debtorsData: any[] = [];
    arrivalsData: any[] = [];

    currentSubView = signal('ganancias'); // Vista por defecto

    constructor(private mockData: MockDataService) { }

    ngOnInit() {
        this.financialLogData = this.mockData.getFinancialLog();
    }

    setSubView(view: string) {
        this.currentSubView.set(view);
    }
}