import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-hall.component.html',
  styleUrls: ['./add-hall.component.css']
})
export class AddHallComponent implements OnInit {
  hallDetails = {
    venueId: '',
    name: '',
    description: '',
    floorNumber: 0,
    capacity: 0,
    price: 0,
    status: 'available'
  };
  selectedImages: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get the venueId from query parameters and set it in hallDetails
    this.route.queryParams.subscribe((params) => {
      if (params['venueId']) {
        this.hallDetails.venueId = params['venueId'];
      }
    });
  }

  onHallImagesChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      this.selectedImages = Array.from(target.files);
    }
  }

  addHall(): void {
    const formData = new FormData();
    formData.append(
      'hall',
      new Blob([JSON.stringify(this.hallDetails)], { type: 'application/json' })
    );
    this.selectedImages.forEach((file) => {
      formData.append('hallImages', file);
    });

    const apiUrl = 'https://bandobasta.onrender.com/bandobasta/api/v1/hall/save';

    this.http.post(apiUrl, formData).subscribe({
      next: () => {
        console.log('Hall added successfully');
        alert('Hall added successfully!');
        // Reset form
        this.hallDetails = {
          venueId: '',
          name: '',
          description: '',
          floorNumber: 0,
          capacity: 0,
          price: 0,
          status: 'available'
        };
        this.selectedImages = [];
      },
      error: (error) => {
        console.error('Error adding hall:', error);
        alert('Failed to add hall. Please try again.');
      }
    });
  }
}
