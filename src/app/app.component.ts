import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  spinner: boolean = false;
  spinner2: boolean = false;
  constructor(
    public ls: LoginService,
    private router: Router,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.ls.loader.subscribe({
      next: (res) => {
        this.spinner = res;
      },
    });

    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.spinner2 = true;
      }
      if (e instanceof NavigationEnd) {
        this.spinner2 = false;
        // localStorage.setItem('url', e.urlAfterRedirects);
        let name = e.urlAfterRedirects;
        if (name) {
          let url = name.split('/');

          if (url.length < 4) {
            this.titleService.setTitle(url[1] + ' | ' + url[2]);
          } else {
            this.titleService.setTitle(url[1] + ' | ' + url[3]);
          }
        }
      }
    });
  }
  title = 'Project';
}
