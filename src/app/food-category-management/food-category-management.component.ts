import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodCategoryService } from '../services/food-category.service';

@Component({
  selector: 'app-food-category-management',
  templateUrl: './food-category-management.component.html',
  styleUrls: ['./food-category-management.component.css'],
})
export class FoodCategoryManagementComponent implements OnInit {
  venueId: number = 1; // Default venue ID
  foodCategories = [
    {
      category: '',
      subCategories: [''],
    },
  ];

  constructor(
    private foodCategoryService: FoodCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the venueId from query params
    this.route.queryParams.subscribe((params) => {
      if (params['venueId']) {
        this.venueId = +params['venueId']; // Convert to a number
      }
    });
  }

  addCategory() {
    this.foodCategories.push({
      category: '',
      subCategories: [''],
    });
  }

  removeCategory(index: number) {
    this.foodCategories.splice(index, 1);
  }

  addSubcategory(categoryIndex: number) {
    this.foodCategories[categoryIndex].subCategories.push('');
  }

  removeSubcategory(categoryIndex: number, subIndex: number) {
    this.foodCategories[categoryIndex].subCategories.splice(subIndex, 1);
  }

  addCategories() {
    this.foodCategoryService.addFoodCategories(this.venueId, this.foodCategories).subscribe({
      next: (response) => {
        if (response.code === '200') {
          alert('Food categories added successfully!');
        } else {
          alert('Failed to add food categories: ' + response.message);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('An error occurred while adding categories.');
      },
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
