import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';

describe('AppComponent', () => {
  let loader: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [AppComponent],
      providers: [LoginService],
    }).compileComponents();
    loader = TestBed.inject(LoginService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    
  });
  it('loader should exicutable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    // app.ls.loader.subscribe((data) => {
    //   app.spinner = data;
    // });
    expect(app.spinner).toBe(false);
  })

})