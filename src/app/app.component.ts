import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public ls: LoginService) {}
  ngOnInit(): void {
    //   this.router.events.subscribe((roterEvent: Event) => {
    //     if (roterEvent instanceof NavigationStart) {
    //       this.show = true;
    //     }
    //     if (roterEvent instanceof NavigationEnd) {
    //       this.show = false;
    //     }
    //   });
  }
  title = 'Project';
}
