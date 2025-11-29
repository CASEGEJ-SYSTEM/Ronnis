import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionesEdit } from './instalaciones-edit';

describe('InstalacionesEdit', () => {
    let component: InstalacionesEdit;
    let fixture: ComponentFixture<InstalacionesEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InstalacionesEdit]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InstalacionesEdit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
