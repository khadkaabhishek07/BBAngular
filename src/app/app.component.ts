import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isExcludedPage: boolean = false;
  title = 'BandoBasta';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Adjust the route condition as per your login route and also default one
        this.isExcludedPage = event.url === '/login' || event.url === '/';
      }});
    }
}
