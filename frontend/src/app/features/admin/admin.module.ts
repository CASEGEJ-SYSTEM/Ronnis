import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { ClientRegistration } from './components/client-registration/client-registration';
import { UserManagement } from './components/user-management/user-management';
import { UserPay } from './components/user-pay/user-pay';
import { Events } from './components/events/events';
import { Instalaciones } from './components/instalaciones/instalaciones';
import { UserPayDetail } from './components/user-pay-detail/user-pay-detail';
import { TrainerManagement } from './components/trainer-management/trainer-management';
import { PriceManagement } from './components/price-management/price-management';
import { Logbook } from './components/logbook/logbook';
import { TrainerEdit } from './components/trainer-edit/trainer-edit';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        CommonModule,
        AdminRoutingModule,
        AdminLayout,
        ClientRegistration,
        UserManagement,
        Events,
        Instalaciones,
        TrainerManagement,
        TrainerEdit,
        UserPay,
        UserPayDetail,
        PriceManagement,
        Logbook
    ]
})
export class AdminModule { }