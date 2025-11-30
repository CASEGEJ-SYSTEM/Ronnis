import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenamientosEdit } from './entrenamientos-edit';

describe('EntrenamientosEdit', () => {
    let component: EntrenamientosEdit;
    let fixture: ComponentFixture<EntrenamientosEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntrenamientosEdit]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EntrenamientosEdit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
