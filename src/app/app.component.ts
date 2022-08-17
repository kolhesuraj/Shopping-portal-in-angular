import { Component, OnInit } from '@angular/core';
import { Router,Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  show!:boolean
  constructor( private router:Router){
  
    this.router.events.subscribe((roterEvent : Event)=>{
      if(roterEvent instanceof NavigationStart){
              this.show = true
      }
       if (roterEvent instanceof NavigationEnd) {
         this.show = false;
       }

    });
  }


  title = 'Project';
}
