import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.component.html',
  styleUrls: ['./add-availability.component.css']
})
export class AddAvailabilityComponent implements OnInit {
  hallId!: number;
  venueId!: number; // Added venueId property
  availabilityDetails: any[] = [];
  selectedDate!: string;

  // Object to hold new availability data
  newAvailability = {
    hallId: this.hallId,
    date: this.selectedDate,
    startTime: '',
    endTime: '',
    status: 'AVAILABLE' // Default status
  };

  // Array to hold time slots
  timeSlots: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.hallId = +this.route.snapshot.paramMap.get('hallId')!;
    this.venueId = +this.route.snapshot.paramMap.get('venueId')!; // Retrieve venueId
    this.selectedDate = new Date().toISOString().split('T')[0]; // Set to today
    this.fetchAvailability(this.selectedDate);
    this.generateTimeSlots(); // Generate time slots when component initializes
  }

  fetchAvailability(date: string): void {
    const url = `https://bandobasta.onrender.com/bandobasta/api/v1/hall/availability?venueId=${this.venueId}&date=${date}`; // Use venueId here
    this.http.get<any>(url).subscribe(response => {
      this.availabilityDetails = response.data.hallAvailabilityDetails;
    });
  }

  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.fetchAvailability(this.selectedDate);
  }

  // Method to save availability
  saveAvailability(): void {
    const url = 'https://bandobasta.onrender.com/bandobasta/api/v1/hall/availability/save';
    
    // Ensure the hallId and date are correctly set
    this.newAvailability.hallId = this.hallId;
    this.newAvailability.date = this.selectedDate; // Set selected date

    this.http.post(url, [this.newAvailability]).subscribe(response => {
      console.log('Availability saved:', response);
      // Refresh availability details after saving
      this.fetchAvailability(this.selectedDate);
      // Optionally reset the form after saving
      this.resetForm();
    });
  }

  generateTimeSlots() {
    const startHour = 9; // Start at 9 AM
    const endHour = 21; // End at 9 PM
    const hours = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.push(`${hour}:00`);
      hours.push(`${hour}:30`);
    }
    
    this.timeSlots = hours;
  }

  resetForm() {
    this.newAvailability.startTime = '';
    this.newAvailability.endTime = '';
  }
}