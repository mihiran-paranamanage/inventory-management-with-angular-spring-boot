import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'lkrCurrency'
})
export class LkrCurrencyPipe implements PipeTransform {

  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  transform(value: number | string, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): string | null {
    let lkrValue = this.currencyPipe.transform(value, 'LKR');
    if (typeof lkrValue === 'string') {
      return lkrValue.replace('LKR', 'LKR ');
    } else {
      return null;
    }
  }

}
