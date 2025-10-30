import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayout } from './components/admin-layout/admin-layout';
import { ClientRegistration } from './components/client-registration/client-registration';
import { UserManagement } from './components/user-management/user-management';
import { UserDetail } from './components/user-detail/user-detail';
import { UserStats } from './components/user-stats/user-stats';
import { TrainerManagement } from './components/trainer-management/trainer-management';
import { PriceManagement } from './components/price-management/price-management';
import { Logbook } from './components/logbook/logbook';

const routes: Routes = [
    {
        path: '',
        component: AdminLayout,
        children: [
            { path: 'registro', component: ClientRegistration },
            { path: 'usuarios', component: UserManagement },
            { path: 'usuarios/:id/editar', component: UserDetail },
            { path: 'usuarios/:id/estadisticas', component: UserStats },
            { path: 'personal', component: TrainerManagement },
            { path: 'precios', component: PriceManagement },
            { path: 'bitacora', component: Logbook },
            {
                path: '', // La ruta por defecto (que es /admin) redirige a /admin/registro
                redirectTo: 'registro',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }