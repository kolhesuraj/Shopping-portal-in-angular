import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent implements OnInit {

  constructor(private http:HttpServiceService) { }

  ngOnInit(): void {
  }
  delete(){
    this.http.delete('customers/profile-picture').subscribe({
      next: (res) =>{
        console.log(res)
      },
      error: (err)=> {
        console.log(err)
      }
    })
  }
  change(){}
}
