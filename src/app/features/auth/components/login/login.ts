import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.html',
})
export class Login {
    loginError = signal('');

    constructor(private router: Router) { }

    handleLogin(credentials: any) {
        if (credentials.email === 'admin@ronnis.com') {
            this.loginError.set('');
            this.router.navigate(['/admin']);
        } else if (credentials.email && credentials.password) {
            this.loginError.set('');
            this.router.navigate(['/home']);
        } else {
            this.loginError.set('Correo o contraseña incorrectos.');
        }
    }
}