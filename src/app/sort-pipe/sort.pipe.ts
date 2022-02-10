import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sorting: number): any[] {
    switch (sorting) {
      case 0:
        value = value.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case 1:
        value = value.sort((a: any, b: any) => b.name.localeCompare(a.name));
        break;
      case 2:
        value = value.sort((a: any, b: any) => a.price_usd - b.price_usd);
        break;
      case 3:
        value = value.sort((a: any, b: any) => b.price_usd - a.price_usd);
        break;
    }
    return value;
  }
}
