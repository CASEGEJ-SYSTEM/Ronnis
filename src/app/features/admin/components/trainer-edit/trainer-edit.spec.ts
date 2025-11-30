import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEdit } from './trainer-edit';

describe('TrainerEdit', () => {
    let component: TrainerEdit;
    let fixture: ComponentFixture<TrainerEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrainerEdit]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrainerEdit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
