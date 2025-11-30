import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
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

  // signal para fecha y hora
  fechaHoraActual = signal(new Date());

  trackByUserId(index: number, user: any) {
    return user.clave_usuario || index;
  }


    currentSubView = signal('ganancias'); // Vista por defecto

    constructor(private mockData: MockDataService) { }

    ngOnInit() {
        this.financialLogData = this.mockData.getFinancialLog();
            // actualizar fecha y hora cada segundo
    setInterval(() => {
      this.fechaHoraActual.set(new Date());
    }, 1000);
  }


    setSubView(view: string) {
        this.currentSubView.set(view);
    }
}