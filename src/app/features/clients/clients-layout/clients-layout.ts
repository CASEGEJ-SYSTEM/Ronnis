import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsHeader } from '../clients-header/clients-header';

@Component({
    selector: 'app-clients-layout',
    standalone: true,
    imports: [RouterOutlet, ClientsHeader],
    templateUrl: './clients-layout.html',
    styleUrl: './clients-layout.css',
})
export class ClientsLayout {  }