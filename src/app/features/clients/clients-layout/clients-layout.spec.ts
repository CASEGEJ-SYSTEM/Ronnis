import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLayout } from './clients-layout';

describe('ClientsLayout', () => {
    let component: ClientsLayout;
    let fixture: ComponentFixture<ClientsLayout>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClientsLayout]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClientsLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
