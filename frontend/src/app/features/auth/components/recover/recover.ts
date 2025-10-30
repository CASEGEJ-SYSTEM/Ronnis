import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-recover',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './recover.html',
})

export class Recover {
    constructor(private router: Router) { }

    Login(formValue: any) {
        this.router.navigate(['/auth/login']);
    }
}
