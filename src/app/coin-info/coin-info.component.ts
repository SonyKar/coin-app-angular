import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CoinsService } from '../services/coins.service';

import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft as backIcon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss'],
})
export class CoinInfoComponent implements OnInit {
  faHeart = emptyHeart;
  backIcon = backIcon;

  private routeSub: Subscription = new Subscription();
  private _updatePriceInterval: any;
  private id: string = '';
  private saveTimer: any;

  coinInfo: any;
  notes: string = '';
  saveStatus: number = 0;
  saveStatusText: string = 'Type your notes, they will be saved automatically';

  constructor(
    private _coinService: CoinsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (this._coinService.isFavourite(this.id)) {
        this.faHeart = filledHeart;
      }

      this.notes = this._coinService.getNotes(this.id);

      this.resetUpdatePrice();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    clearInterval(this._updatePriceInterval);
  }

  resetUpdatePrice() {
    clearInterval(this._updatePriceInterval);

    this.coinInfo = this._coinService.getCoin(this.id);

    this._updatePriceInterval = setInterval(() => {
      this.coinInfo = this._coinService.getCoin(this.id);
    }, 2000);
  }

  onFavouriteHandler(event: any) {
    event.stopPropagation();

    let response = this._coinService.addRemoveFavourite(this.id);
    if (response === 0) {
      this.faHeart = emptyHeart;
    } else {
      this.faHeart = filledHeart;
    }
  }

  onNotesEditHandler(event: any) {
    clearTimeout(this.saveTimer);

    this.saveStatus = 1;
    this.saveStatusText = 'Saving is in progress...';

    this.saveTimer = setTimeout(() => {
      this._coinService.saveNotes(this.id, event.target.value);
      this.saveStatus = 2;
      this.saveStatusText = 'Successfully saved!';
    }, 250);
  }
}
