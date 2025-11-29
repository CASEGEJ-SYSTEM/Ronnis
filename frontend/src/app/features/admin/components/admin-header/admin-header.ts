import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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
  styleUrl: './admin-header.css',
})
export class AdminHeader implements OnInit {

  rol = '';
  sede = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rol = localStorage.getItem('rol') ?? '';

      const sedeGuardada = localStorage.getItem('sede') ?? '';

      if (this.rol === 'superadmin') {

        let sedes = sedeGuardada.split(',').map(s => s.trim());

        // Si hay varias sedes → seleccionar la primera y guardar
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
      this.router.navigate(['/login']);   // o la ruta correcta de tu login
    }
  }

}
