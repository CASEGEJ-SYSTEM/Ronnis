import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEdit } from './events-edit';

describe('EventsEdit', () => {
    let component: EventsEdit;
    let fixture: ComponentFixture<EventsEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventsEdit]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EventsEdit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
