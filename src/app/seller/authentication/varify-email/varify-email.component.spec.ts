import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

import { VarifyEmailComponent } from './varify-email.component';

describe('VarifyEmailComponent', () => {
  let component: VarifyEmailComponent;
  let fixture: ComponentFixture<VarifyEmailComponent>;
  let activateroute: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarifyEmailComponent],
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [HttpServiceService],
    }).compileComponents();

    fixture = TestBed.createComponent(VarifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activateroute: TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('NGONIT function', () => {
    spyOn(Swal, 'fire');
    component.ngOnInit();
  });
});
