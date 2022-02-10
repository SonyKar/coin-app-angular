import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinsService } from '../services/coins.service';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.scss'],
})
export class CoinTableComponent implements OnInit {
  coins: any[] = [];
  favouriteCoins: any = {};
  selectedItem: string = '';
  sortType: number = 0;
  searchText: string = '';

  private _pollingTimeout: any;

  constructor(private _coinService: CoinsService, private _route: Router) {}

  ngOnInit(): void {
    this.favouriteCoins = this._coinService.getFavourites();

    this.resetUpdatingTimeout();
  }

  ngOnDestroy(): void {
    clearInterval(this._pollingTimeout);
  }

  resetUpdatingTimeout() {
    clearTimeout(this._pollingTimeout);

    this.coins = this._coinService.getCoins();

    this._pollingTimeout = setInterval(() => {
      this.coins = this._coinService.getCoins();
    }, 5000);
  }

  selectItemHandler(id: string) {
    if (this.selectedItem === id) {
      this._route.navigate(['/coin/' + id]);
    } else {
      this.selectedItem = id;
    }
  }

  sortHandler(sortType: number) {
    this.sortType = sortType;

    this.resetUpdatingTimeout();
  }

  searchHandler(searchText: string) {
    this.searchText = searchText;

    this.resetUpdatingTimeout();
  }
}
