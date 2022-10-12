import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate',
})
export class ExpiryDatePipe implements PipeTransform {
  transform(value: any) {
    let arr = value;
    let MM = value.slice(0, 2);
    let YY = value.slice(3, 7);
    if (MM > 12 ||MM <= 0) {
      value = '07' + value.slice(3);
    }
    if ((YY.length == 4 && YY < 2022) || (YY.length == 4 && YY > 2050)) {
      arr = MM + '/2029';
    }
    if (value.length == 2) {
      arr = value + '/';
    }
    return arr;
  }
}
