import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VenueComponent } from './venue/venue.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddVenueComponent } from './add-venue/add-venue.component';
import { AddHallComponent } from './add-hall/add-hall.component';
import { HallComponent } from './hall/hall.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addvenue', component: AddVenueComponent },
  { path: 'addhall', component: AddHallComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: 'halls', component: HallComponent },

  { path: 'venues', component: VenueComponent }
  //{ path: '', redirectTo: '/venues', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
