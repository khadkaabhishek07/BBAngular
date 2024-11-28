import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { VenueComponent } from './venue/venue.component';
import { AddVenueComponent } from './add-venue/add-venue.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddHallComponent } from './add-hall/add-hall.component';
import { HallComponent } from './hall/hall.component';
import { HallService } from './services/hall.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    VenueComponent,     
    AddVenueComponent, NavbarComponent, AddHallComponent, HallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,          // Add FormsModule here
    HttpClientModule       // Add HttpClientModule for API calls
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]  
})
export class AppModule { }
