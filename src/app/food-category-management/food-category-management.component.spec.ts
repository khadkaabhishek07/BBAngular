import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCategoryManagementComponent } from './food-category-management.component';

describe('FoodCategoryManagementComponent', () => {
  let component: FoodCategoryManagementComponent;
  let fixture: ComponentFixture<FoodCategoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodCategoryManagementComponent]
    });
    fixture = TestBed.createComponent(FoodCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
