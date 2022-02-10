import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(filteredCoins: any[], searchText: string): any[] {
    filteredCoins = filteredCoins.filter((coin: any) =>
      coin.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    return filteredCoins;
  }
}
