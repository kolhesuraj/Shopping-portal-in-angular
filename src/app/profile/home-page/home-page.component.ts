import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private _dialog: MatDialog, private ls:LoginService) {}
 

  FirstName!: string;
  LastName!: string;
  CompanyName!: string;
  Email!: string;
  ngOnInit(): void {
    this.ls.loadData();
    this.setData();
  }
  logout() {
       localStorage.removeItem('LoginUser');
  }

  editProfile() {
    const dialogRef = this._dialog.open(EditProfileComponent,{
      width:'37%',
    });
    this.setData();
  }
  setData(){
    // console.log("refresh");
     
        // console.log(data);
        let data:any;
        this.ls.LogIndata.subscribe((result :any)=>{
          data = result;
          // console.log(result)
          // console.log(data);

          this.FirstName = data.FirstName;
          this.LastName = data.LastName;
          this.CompanyName = data.CompanyName;
          this.Email = data.Email;
        })
        
  }
}
