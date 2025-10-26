import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    constructor(private router: Router) { }

    handleRegister(formValue: any) {
        console.log('Datos de registro:', formValue);
        // Simulación que después de un registro exitoso redirige al login
        alert('Registrado correctamente. Por favor, inicia sesión para continuar.');
        this.router.navigate(['/auth/login']);
    }
}