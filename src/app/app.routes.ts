import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        redirectTo: 'home', // La página por defecto será la página de inicio
        pathMatch: 'full'
    },
    {
        path: '**', // Cualquier otra ruta te redirige a la página de inicio
        redirectTo: 'home'
    }
];