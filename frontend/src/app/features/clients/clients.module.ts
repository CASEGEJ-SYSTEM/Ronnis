import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsLayout } from './clients-layout/clients-layout';
import { ClientsProfile } from './clients-profile/clients-profile';
import { ClientsStats } from './clients-stats/clients-stats';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ClientsRoutingModule ,
        ClientsLayout,
        ClientsProfile,
        ClientsStats
    ]
})
export class ClientsModule { }