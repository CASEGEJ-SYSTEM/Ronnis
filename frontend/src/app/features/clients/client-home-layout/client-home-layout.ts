import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsHeader } from '../clients-header/clients-header';

@Component({
    selector: 'app-client-home-layout',
    standalone: true,
    imports: [RouterOutlet, ClientsHeader],
    templateUrl: './client-home-layout.html',
    styleUrl: './client-home-layout.css',
})
export class ClientHomeLayout {  }