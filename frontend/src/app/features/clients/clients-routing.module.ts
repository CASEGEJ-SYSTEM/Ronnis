import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsLayout } from './clients-layout/clients-layout';
import { ClientsProfile } from './clients-profile/clients-profile';
import { ClientsStats } from './clients-stats/clients-stats';


const routes: Routes = [
    {
        path: '',
        component: ClientsLayout,
        children: [
            { path: 'clients', component:ClientsProfile },
            { path: 'usuarios', component: ClientsStats },
            {
                path: '', // La ruta por defecto (que es /admin) redirige a /admin/registro
                redirectTo: 'clients',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }