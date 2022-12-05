import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { combineLatestWith, Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { UpdateImagesComponent } from './update-images.component';
// const data = {
//   user: 1,
// };
// class httpservice {
//   patch(url: string): Observable<any> {
//     return of(data);
//   }
// }

describe('UpdateImagesComponent', () => {
  let component: UpdateImagesComponent;
  let fixture: ComponentFixture<UpdateImagesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateImagesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        HotToastService,
        HttpServiceService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('update image ', () => {
    // spyOn(component.dialogRef, 'close');
    spyOn(component.deletearray, 'forEach');
    component.product = {
      _id: 10,
    };
    component.update();
  });
  it('deleteimg method with delete array more than 1 arguments', () => {
    component.deletearray = [1, 2, 3];
    component.deleteimg(1);
    expect(component.deletearray.length).toBeGreaterThan(1);
  });
  it('deleteimg method with delete array less than 1 arguments', () => {
    component.deletearray = [];
    component.deleteimg(1);
    expect(component.deletearray.length).toBeGreaterThan(0);
  });

  it('on select', () => {
    let event = {
      addedFiles: [1, 2, 3],
    };
    spyOn(component.files, 'push');
    component.onSelect(event);
  });
  it('on remove', () => {
    let event = {
      addedFiles: [1, 2, 3],
    };
    spyOn(component.files, 'splice');
    component.onRemove(event);
  });
});
