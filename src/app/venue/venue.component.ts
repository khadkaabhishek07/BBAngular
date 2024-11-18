import { Component, OnInit } from '@angular/core';
import { VenueService } from '../services/venue.service';

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

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.loadVenues(this.currentPage);
  }

  loadVenues(page: number): void {
    this.venueService.getVenues(page, this.pageSize).subscribe({
      next: response => {
        this.venues = response.data.venues;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      },
      error: error => {
        console.error('Error fetching venues:', error);
      }
    });
  }

  // Pagination controls
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
