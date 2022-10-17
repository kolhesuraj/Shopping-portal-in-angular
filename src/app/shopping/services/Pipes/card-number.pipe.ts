import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string): string {
    let lastValue = value;
    let firstFour = value.slice(0, 4);
    let secondFour = value.slice(5, 9);
    let thirdFour = value.slice(10, 14);

    if (firstFour.length == 4) {
      lastValue = firstFour + ' ';
    }
    if (secondFour.length == 4) {
      lastValue = lastValue + secondFour + ' ';
    }
    if (thirdFour.length == 4) {
      lastValue = lastValue + thirdFour + ' ';

    }
    value = lastValue;
    return value;
  }
}
