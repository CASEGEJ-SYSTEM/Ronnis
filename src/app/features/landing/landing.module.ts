import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LandingPage } from './components/landing-page/landing-page';
import { HeroSection } from './components/hero-section/hero-section';
import { AboutUsSection } from './components/about-us-section/about-us-section';
import { PricingSection } from './components/pricing-section/pricing-section';
import { TrainersSection } from './components/trainers-section/trainers-section';
import { LocationSection } from './components/location-section/location-section';
import { GallerySection } from './components/gallery-section/gallery-section';


@NgModule({
    declarations: [],
    imports: [
        LandingPage,
        HeroSection,
        AboutUsSection,
        PricingSection,
        TrainersSection,
        LocationSection,
        GallerySection,
        CommonModule,
        LandingRoutingModule,
        SharedModule
    ]
})
export class LandingModule { }