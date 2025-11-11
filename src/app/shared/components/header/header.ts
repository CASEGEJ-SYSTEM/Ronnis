import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../../features/admin/admin-routing.module";

@Component({
    selector: 'app-header',
    imports: [AdminRoutingModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {

}
