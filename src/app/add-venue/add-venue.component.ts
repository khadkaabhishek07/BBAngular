import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {
  venueDetails = {
    ownerId: '', // Will be dynamically set based on role
    name: '',
    country: 'Nepal',
    state: '',
    district: '',
    city: '',
    streetName: '',
    streetNumber: '',
    email: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    countryCode: '+977',
    registrationNumber: '',
    licenseNumber: '',
    permanentAccountNumber: '',
    description: '',
    menuPrice: 0
  };

  panImage: File | null = null;
  licenseImage: File | null = null;
  venueImages: File[] = [];
  isAdmin: boolean = false; // Tracks if the user has admin privileges

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin(); // Check if the user is an admin
    this.initializeOwnerId();
  }

  initializeOwnerId(): void {
    if (!this.isAdmin) {
      const ownerId = this.authService.getUserId();
      if (ownerId) {
        this.venueDetails.ownerId = ownerId;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page
  }

  onPanImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.panImage = input.files[0];
    }
  }

  onLicenseImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.licenseImage = input.files[0];
    }
  }

  onVenueImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.venueImages = Array.from(input.files);
    }
  }

  addVenue(): void {
    const formData = new FormData();

    // Append venue details as JSON
    formData.append('venue', new Blob([JSON.stringify(this.venueDetails)], { type: 'application/json' }));

    // Append files
    if (this.panImage) {
      formData.append('panImage', this.panImage);
    }
    if (this.licenseImage) {
      formData.append('licenseImage', this.licenseImage);
    }
    this.venueImages.forEach((file) => {
      formData.append('venueImages', file);
    });

    // API Call
    this.http.post('https://bandobasta.onrender.com/bandobasta/api/v1/venue', formData).subscribe({
      next: () => {
        console.log('Venue added successfully');
        this.router.navigate(['/venues']);
      },
      error: (error) => {
        console.error('Error adding venue:', error);
      },
    });
  }
}
