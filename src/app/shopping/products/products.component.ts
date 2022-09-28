import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  list: any = {};
  result!: any[];
  data!: string;
  myControl = new FormControl('');
  flag: boolean = false;
  itemPerPage = [12, 24, 48];
  sortByarray = ['name', 'price'];
  pagenumber: number = 1;
  limit: number = this.itemPerPage[0];
  search: string = '';
  sort: string = 'name';
  suggestion: string[] = [''];
  filteredOptions: Observable<string[]> | undefined;
  token: number = 0;
  customer: any;
  profile: any;
  constructor(
    private http: HttpServiceService,
    private route: Router,
    private service: CustomersService
  ) {
        this.getProfile();
        this.getProducts();
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(' '),
      map((value: string | null) => this._filter(value || ''))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suggestion.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  getSuggetion() {
    const data = `limit=${this.list.totalResults}`;
    this.http.get(`shop/products?${data}`).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.results.forEach((element: any) => {
          if (this.suggestion.includes(element.name)) {
          } else {
            this.suggestion.push(element.name);
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getProfile() {
    this.customer = this.service.getCustomer();
    if (this.customer) {
      this.http.get('shop/auth/self').subscribe({
        next: (res) => {
          // console.log(res);
          this.profile = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  getProducts() {
    let query: string;
    if (this.search == '' || this.search == ' ') {
      this.setdata();
      query = this.data;
    } else {
      this.setdata();
      query = this.data;
      query = `${query}&name=${this.search}`;
    }
    this.http.get(`shop/products?${query}`).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.list = res;
        this.result = res.results;
        if (this.token == 0) {
          this.getSuggetion();
          this.token = 1;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.getProfile();
  }

  openNav() {
    this.flag = true;
  }
  closeNav() {
    this.flag = false;
  }
  setdata(): any {
    this.data = `page=${this.pagenumber}&limit=${this.limit}&sortBy=${this.sort}`;
  }

  itemCount(count: number) {
    // console.log(count);
    this.limit = count;
    this.getProducts();
  }
  sortBy(by: string) {
    // console.log(by);
    this.sort = by;
    this.getProducts();
  }
  searchinput(value: string) {
    if (value) {
      this.search = value;
    } else {
      this.search = '';
    }
    this.getProducts();
  }
  gotoPage(page: number) {
    this.pagenumber = page;
    this.getProducts();
  }
  addToCart(id: any) {
    console.log(id);
  }
  BuyNow(product_id: any) {
    console.log(product_id);
  }
}
