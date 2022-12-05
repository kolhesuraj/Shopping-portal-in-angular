import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

import { EditProfileComponent } from './edit-profile.component';
class httpservice {
  get() {
    return of({ name: 'name', email: 'email@gmail.com' });
  }
  patch() {
    return of([]);
  }
  delete() {
    return of([]);
  }
  post(): Observable<any> {
    return of([]);
  }
}
const m = {
  isConfirmed: true,
};
Swal.fire().then((m: any) => {});
describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let toastrService: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      imports: [HttpClientModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: HotToastService, useValue: toastrService },
        { provide: HttpServiceService, useClass: httpservice },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.getProfile();
    component.editProfile.patchValue({
      name: 'name',
      email: 'email@gmail.com',
    });
  });

  it('check Image', () => {
    const event = {
      target: {
        files: [1, 2, 3],
      },
    };
    component.checkImg(event);
    expect(event.target.files.length).toBeGreaterThan(0);
    component.openImageBox();
    expect(component.open).toBeFalse();
    component.fileChangeEvent(event);
    expect(component.imageChangedEvent).toBe(event);
    component.loadImageFailed();
    expect(component.imageChangedEvent).toBe('');
  });
  it('update', () => {
    component.editProfile.patchValue({
      name: 'name',
      email: 'email@gmail.com',
    });
    component.update();
  });
  it('swal', () => {
    // spyOn(Swal.fire(), 'then');
    component.delete();
    Swal.clickConfirm();
    // expect(component.updating).toBeTrue();
  });
  it('updateImage', () => {
    component.uploadeImage();
    expect(component.open).toBeTrue();
  });
});
