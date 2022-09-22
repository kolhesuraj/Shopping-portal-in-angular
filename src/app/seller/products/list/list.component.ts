import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  list: any = {};
  result!: any[];
  data!: string;
  myControl = new FormControl('');
  flag: boolean = false;
  itemPerPage = [4, 8, 16];
  sortByarray = ['name', 'price'];
  pagenumber: number = 1;
  limit: number = 4;
  search: string = '';
  sort: string = 'name';
  suggestion: string[] = [''];
  filteredOptions: Observable<string[]> | undefined;
  token: number = 0;
  constructor(
    private route: Router,
    private authService: SocialAuthService,
    private httpservice: HttpServiceService
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
    /* This is a rxjs operator. It is used to filter the options in the search input. */
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
    this.httpservice.get(`products?${data}`).subscribe({
      next: (res: any) => {
        console.log(res);
        res.results.forEach((element: any) => {
          if (this.suggestion.includes(element.name)) {
          } else {
            this.suggestion.push(element.name);
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openNav() {
    this.flag = true;
  }
  closeNav() {
    this.flag = false;
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
    this.httpservice.get(`products?${query}`).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.list = res;
        this.result = res.results;
        if (this.token == 0) {
          this.getSuggetion();
          this.token = 1;
        }
        // console.log(this.list);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setdata(): any {
    this.data = `page=${this.pagenumber}&limit=${this.limit}&sortBy=${this.sort}`;
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
  }

  gotoproduct(id: any) {
    this.route.navigate([`/seller/products/product`, id]);
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

  deleteProduct(product_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpservice.delete(`products/${product_id}`).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
            this.getProducts();
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Something went wrong! ${err}`,
            });
          },
        });
      }
    });
  }
}
