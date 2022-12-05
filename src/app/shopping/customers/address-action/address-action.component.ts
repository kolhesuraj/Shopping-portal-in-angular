import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  _MatDialogBase,
} from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-action',
  templateUrl: './address-action.component.html',
  styleUrls: ['./address-action.component.css'],
})
export class AddressActionComponent implements OnInit {
  addressFrom!: FormGroup;
  submited: boolean = false;
  errorFromserver: any;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    public _matDialog: MatDialogRef<AddressActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpServiceService
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.addressFrom = this.fb.group({
      street: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pin: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
    this.setValue();
  }
  get Street() {
    return this.addressFrom.get('street');
  }
  get AddressLine2() {
    return this.addressFrom.get('addressLine2');
  }
  get City() {
    return this.addressFrom.get('city');
  }
  get State() {
    return this.addressFrom.get('state');
  }
  get Pin() {
    return this.addressFrom.get('pin');
  }
  setValue() {
    if (this.data) {
      this.addressFrom.patchValue({
        street: this.data.street,
        addressLine2: this.data.addressLine2,
        city: this.data.city,
        state: this.data.state,
        pin: this.data.pin,
      });
    }
  }
  saveAddress() {
    if (this.addressFrom.valid) {
      this.submited = false;
      this.updating = true;
      if (this.data) {
        this.http
          .put(`customers/address/${this.data._id}`, this.addressFrom.value)
          .subscribe({
            next: (res) => {
              // console.log(res);
              Swal.fire('Address Updated Successfully');
              this.reset();
            }
          });
      } else {
        this.http.post('customers/address', this.addressFrom.value).subscribe({
          next: (res) => {
            // console.log(res);
            Swal.fire('Address Added Successfully');
            this.reset();
          }
        });
      }
    } else {
      this.submited = true;
    }
  }
  reset() {
    this._matDialog.close();
  }
}
