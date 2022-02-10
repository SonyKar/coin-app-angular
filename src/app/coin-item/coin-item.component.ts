import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { CoinsService } from '../services/coins.service';

@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.scss'],
})
export class CoinItemComponent implements OnInit {
  @Input() coin: any;
  @Input() isSelected: boolean = false;
  @Input() isFavourite: boolean = false;

  @Output() onSelectCurrency: EventEmitter<string> = new EventEmitter();

  faHeart = emptyHeart;

  constructor(private _coinService: CoinsService) {}

  ngOnInit(): void {
    if (this.isFavourite) {
      this.faHeart = filledHeart;
    }
  }

  onSelectCurrencyHandler() {
    console.log(`Coin ${this.coin.name} clicked!`);
    this.onSelectCurrency.emit(this.coin.asset_id);
  }

  onFavouriteHandler(event: any) {
    event.stopPropagation();

    let response = this._coinService.addRemoveFavourite(this.coin.asset_id);
    if (response === 0) {
      this.faHeart = emptyHeart;
    } else {
      this.faHeart = filledHeart;
    }
  }
}
