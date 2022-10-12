import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdDate'
})
export class CreatedDatePipe implements PipeTransform {

  transform(value: any): Date {
    let arr = value.split('T')
    return arr[0]
  }

}
