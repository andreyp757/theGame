import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'romanNumeral',
  standalone: true
})
export class RomanNumeralPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 1 || value > 3999) return value.toString(); // Roman numerals are traditionally between 1 and 3999

    const romanMap = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ];

    let result = '';
    for (const { value: numValue, numeral } of romanMap) {
      while (value >= numValue) {
        result += numeral;
        value -= numValue;
      }
    }

    return result;
  }
}
