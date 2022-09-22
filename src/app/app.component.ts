import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  spinner!: Observable<boolean>;
  constructor(public ls: LoginService) {}
  ngOnInit(): void {
    this.spinner = this.ls.loader;
  }
  title = 'Project';
}
