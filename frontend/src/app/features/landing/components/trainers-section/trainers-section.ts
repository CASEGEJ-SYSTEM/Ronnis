import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-trainers-section',
    templateUrl: './trainers-section.html',
})
export class TrainersSection {
    @Input() trainers: any[] = [];
}