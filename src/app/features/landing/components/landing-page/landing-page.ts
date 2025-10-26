import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';

import { Header } from '../../../../shared/components/header/header';
import { Footer } from '../../../../shared/components/footer/footer';
import { HeroSection } from '../hero-section/hero-section';
import { AboutUsSection } from '../about-us-section/about-us-section';
import { PricingSection } from '../pricing-section/pricing-section';
import { TrainersSection } from '../trainers-section/trainers-section';
import { LocationSection } from '../location-section/location-section';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        Header,
        Footer,
        HeroSection,
        AboutUsSection,
        PricingSection,
        TrainersSection,
        LocationSection
    ],
    templateUrl: './landing-page.html',
    styleUrls: ['./landing-page.css']
})
export class LandingPage implements OnInit {
    trainersData: any[] = [];
    plansData: any[] = [];

    constructor(private mockDataService: MockDataService) { }

    ngOnInit() {
        this.trainersData = this.mockDataService.getTrainers();
        this.plansData = this.mockDataService.getPlans();
    }
}