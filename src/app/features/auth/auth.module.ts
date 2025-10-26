import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        Login,
        Register
    ]
})
export class AuthModule { }