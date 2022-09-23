import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customer:any;
  constructor() {
   }
   getCustomer(){
    return this.customer = localStorage.getItem('token');
   }
}
