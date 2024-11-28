import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../services/hall.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css'],
})
export class HallComponent implements OnInit {
  venueId!: string;
  halls: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private hallService: HallService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.venueId = params['venueId']; // Get venueId from query parameters
      if (this.venueId) {
        this.loadHalls();
      }
    });
  }

  loadHalls(): void {
    this.hallService.getHallsByVenue(this.venueId, this.currentPage).subscribe({
      next: (response) => {
        if (response?.data?.hallDetails) {
          this.halls = response.data.hallDetails;
          this.currentPage = response.data.currentPage + 1; // API is zero-indexed
          this.totalPages = response.data.totalPages;
        } else {
          console.error('Unexpected response structure:', response);
          this.halls = [];
        }
      },
      error: (error) => {
        console.error('Error fetching halls:', error);
        this.halls = [];
      },
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadHalls();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadHalls();
    }
  }
  // Method to go to the previous slide
  prevSlide(hallId: number) {
    const carouselElement = document.getElementById(`carousel${hallId}`);
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement);
      carousel.prev();
    }
  }

  // Method to go to the next slide
  nextSlide(hallId: number) {
    const carouselElement = document.getElementById(`carousel${hallId}`);
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement);
      carousel.next();
    }
  }
}
