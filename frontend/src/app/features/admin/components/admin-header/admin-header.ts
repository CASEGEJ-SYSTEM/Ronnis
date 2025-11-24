import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {

  rol = localStorage.getItem('rol') ?? '';
  sede = localStorage.getItem('sede')?.split(',') || [];

  constructor(private router: Router) {}

  changeSede() {

    // Convertir a cadena antes de guardar
    localStorage.setItem('sede', this.sede.join(','));

    location.reload(); 
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
