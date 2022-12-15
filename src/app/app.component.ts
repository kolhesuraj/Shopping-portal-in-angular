import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  spinner: boolean = false;
  constructor(public ls: LoginService) {}
  ngOnInit(): void {
    this.ls.loader.subscribe({
      next: (res)=>{
        this.spinner = res
      }
    })
  }
  title = 'Project';
  
}
