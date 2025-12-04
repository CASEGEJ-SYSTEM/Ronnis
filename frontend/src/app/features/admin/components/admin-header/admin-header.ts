import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.css'], // <- corregido
})
export class AdminHeader implements OnInit {

  rol = '';
  sede = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private http: HttpClient // <- agregado
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rol = localStorage.getItem('rol') ?? '';
      const sedeGuardada = localStorage.getItem('sede') ?? '';

      if (this.rol === 'superadmin') {
        let sedes = sedeGuardada.split(',').map(s => s.trim());
        if (sedes.length > 1) {
          this.sede = sedes[0];
          localStorage.setItem('sede', this.sede); 
        } else {
          this.sede = sedeGuardada;
        }
      } else {
        this.sede = sedeGuardada;
      }
    }
  }

  changeSede() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sede', this.sede);
      location.reload();
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  irAPagos2() {
    if (isPlatformBrowser(this.platformId)) {
      // Llamada en segundo plano, no bloquea la navegación
      this.http.get('http://localhost:8000/api/pagos/actualizar').subscribe({
        next: () => console.log('Pagos actualizados en segundo plano'),
        error: (err) => console.error('Error actualizando pagos:', err)
      });

      // Navega inmediatamente
      this.router.navigate(['/admin/usuarios']);
    }  
  }

  irAPagos() {
    if (isPlatformBrowser(this.platformId)) {
      // Llamada en segundo plano, no bloquea la navegación
      this.http.get('http://localhost:8000/api/pagos/actualizar').subscribe({
        next: () => console.log('Pagos actualizados en segundo plano'),
        error: (err) => console.error('Error actualizando pagos:', err)
      });

      // Navega inmediatamente
      this.router.navigate(['/admin/pago']);
    }
  }

}
