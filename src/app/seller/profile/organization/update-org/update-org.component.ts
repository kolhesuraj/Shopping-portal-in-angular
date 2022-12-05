import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
interface dialogdata {
  email: string;
  name: string;
}

@Component({
  selector: 'app-update-org',
  templateUrl: './update-org.component.html',
  styleUrls: ['./update-org.component.css'],
})
export class UpdateOrgComponent implements OnInit {
  editForm!: FormGroup;
  Name!: string;
  Email!: string;
  updating: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateOrgComponent>,
    private httpservice: HttpServiceService,
    private toaster: HotToastService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
    // console.log(this.Email);
    this.editForm.patchValue({ email: this.data.email, name: this.data.name });
  }
  get email() {
    return this.editForm.get('email');
  }
  get name() {
    return this.editForm.get('name');
  }

  submited = false;
  update() {
    if (this.editForm.valid) {
      this.updating = true;
      // console.log(this.editForm.value);
      this.httpservice.patch('users/org', this.editForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.toaster.success('Organixzation Details Upadetd');
          this._dialogRef.close();
        },
      });
    }
  }
}
