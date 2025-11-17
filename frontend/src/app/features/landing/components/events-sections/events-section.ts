import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-events-section',
  standalone: true,
  templateUrl: './events-section.html',
  styleUrls: ['./events-section.css'],
})
export class EventsSection {

  @ViewChild('slideContainer', { static: true }) slideContainer!: ElementRef;
  currentIndex = 0;

  moveSlide(direction: number) {
    const totalSlides = 3; // Fijo porque son 3 imágenes
    this.currentIndex = (this.currentIndex + direction + totalSlides) % totalSlides;
    const offset = -this.currentIndex * 100;
    this.slideContainer.nativeElement.style.transform = `translateX(${offset}%)`;
  }
}
