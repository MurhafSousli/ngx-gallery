import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nFormatter'
})
export class NFormatterPipe implements PipeTransform {

  transform(num: any, digits?: any): any {

    if (typeof num !== 'number') {
      num = 1;
    }

    return nFormatter(num, digits);
  }

}

/** Change share counts to a readable number */
export const nFormatter = (num: number, digits: number) => {

  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'K'}
  ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
    }
  }
  return num.toFixed(digits).replace(rx, '$1');
};
