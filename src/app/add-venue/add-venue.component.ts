import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css'],
})
export class AddVenueComponent implements OnInit {
  venueDetails = {
    ownerId: '',
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
    menuPrice: 0,
  };

  panImage: File | null = null;
  licenseImage: File | null = null;

  // Array to store files along with their preview URLs
  venueImages: { file: File; preview: string }[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false; // Tracks loading state

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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

  addVenueImages(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.venueImages.push({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.venueImages.splice(index, 1);
  }

  addVenue(): void {
    const formData = new FormData();
  
    // Append venue details as JSON
    formData.append(
      'venue',
      new Blob([JSON.stringify(this.venueDetails)], { type: 'application/json' })
    );
  
    // Append single file fields
    if (this.panImage) {
      formData.append('panImage', this.panImage);
    }
    if (this.licenseImage) {
      formData.append('licenseImage', this.licenseImage);
    }
  
    // Append multiple venue images as individual files under the same key
    this.venueImages.forEach(({ file }) => {
      formData.append('venueImages', file);
    });
  
    // Set loading state
    this.isLoading = true;
  
    // API Call
    this.http.post('https://bandobasta.onrender.com/bandobasta/api/v1/venue', formData).subscribe({
      next: () => {
        console.log('Venue added successfully');
        this.isLoading = false;
        this.router.navigate(['/venues']);
      },
      error: (error) => {
        console.error('Error adding venue:', error);
        this.isLoading = false;
      },
    });
  }
  
}
