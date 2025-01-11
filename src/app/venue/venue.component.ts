import { Component, OnInit } from '@angular/core';
import { VenueService } from '../services/venue.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-venue',
    templateUrl: './venue.component.html',
    styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
    venues: any[] = [];
    currentPage: number = 1;
    totalPages: number = 1;
    pageSize: number = 2;
    ownerId: string | null = null; // For owner-specific venues

    constructor(
        private venueService: VenueService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        // Check role and load venues accordingly
        if (this.authService.isAdmin()) {
            this.loadVenues(this.currentPage);
        } else if (this.authService.isOwner()) {
            this.ownerId = this.authService.getRoles().includes('ROLE_OWNER') ? this.authService.getUserId() : null; // Replace '1' with dynamic owner ID if available
            this.loadOwnerVenues(this.ownerId!);
        }
    }

    navigateToAddHall(venueId: number): void {
        this.router.navigate(['/addhall'], { queryParams: { venueId } });
    }

    navigateToViewHalls(venueId: number): void {
        this.router.navigate(['/halls'], { queryParams: { venueId } });
    }

    navigateToAddFoodCategory(venueId: number): void {
        this.router.navigate(['/addfoodcategory'], { queryParams: { venueId } });
    }

    prevSlide(venueId: number): void {
        const carouselElement = document.getElementById(`carousel${venueId}`);
        if (carouselElement) {
            const carouselInstance = new bootstrap.Carousel(carouselElement);
            carouselInstance.prev();
        }
    }

    nextSlide(venueId: number): void {
        const carouselElement = document.getElementById(`carousel${venueId}`);
        if (carouselElement) {
            const carouselInstance = new bootstrap.Carousel(carouselElement);
            carouselInstance.next();
        }
    }

    private parseVenueResponse(response: any): void {
        if (response?.data?.venues) {
            this.venues = response.data.venues; // Extract venues array
            this.currentPage = response.data.currentPage;
            this.totalPages = response.data.totalPages;
        } else {
            console.error('Unexpected response structure:', response);
            this.venues = []; // Fallback to an empty array
        }
    }

    loadVenues(page: number): void {
        this.venueService.getVenues(page, this.pageSize).subscribe({
            next: response => {
                this.parseVenueResponse(response);
            },
            error: error => {
                console.error('Error fetching venues:', error);
                this.venues = []; // Fallback to an empty array on error
            }
        });
    }

    loadOwnerVenues(ownerId: string): void {
        this.venueService.getVenuesByOwner(ownerId).subscribe({
            next: response => {
                this.parseVenueResponse(response); // Reuse the shared parsing logic
            },
            error: error => {
                console.error('Error fetching owner-specific venues:', error);
                this.venues = []; // Fallback to an empty array on error
            }
        });
    }

    goToPreviousPage(): void {
        if (this.currentPage > 1) {
            this.loadVenues(this.currentPage - 1);
        }
    }

    goToNextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.loadVenues(this.currentPage + 1);
        }
    }
}