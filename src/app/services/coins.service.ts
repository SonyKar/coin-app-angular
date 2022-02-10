import { Injectable } from '@angular/core';
import { COIN_DATA } from '../data/coin-data';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  getCoins() {
    return COIN_DATA.map((coin) => {
      if (Math.random() > 0.5) {
        coin.price_usd = (coin.price_usd || 10) + (coin.price_usd || 10) / 100;
      } else {
        coin.price_usd = (coin.price_usd || 10) - (coin.price_usd || 10) / 100;
      }
      return coin;
    });
  }

  getCoin(id: string) {
    return COIN_DATA.filter((coin) => {
      if (coin.asset_id === id) {
        if (Math.random() > 0.5) {
          coin.price_usd =
            (coin.price_usd || 10) + (coin.price_usd || 10) / 100;
        } else {
          coin.price_usd =
            (coin.price_usd || 10) - (coin.price_usd || 10) / 100;
        }
        return coin;
      }
      return false;
    })[0];
  }

  getFavourites() {
    let favouriteCoins: any = {};
    let favouriteCoinsJSON: any = localStorage.getItem('favourites');

    if (favouriteCoinsJSON === null) {
      favouriteCoins = {};
    } else {
      favouriteCoins = JSON.parse(favouriteCoinsJSON);
    }

    return favouriteCoins;
  }

  isFavourite(id: string): boolean {
    let favouritesList: any = this.getFavourites();
    return favouritesList[id];
  }

  addRemoveFavourite(id: string): number {
    let favouritesList: any = this.getFavourites();
    let response: number;

    if (favouritesList[id]) {
      delete favouritesList[id];
      response = 0;
    } else {
      let idJSON: any = {};
      idJSON[id] = true;
      response = 1;

      favouritesList = {
        ...favouritesList,
        ...idJSON,
      };
    }

    localStorage.setItem('favourites', JSON.stringify(favouritesList));
    return response;
  }

  getAllNotes() {
    let notes: any = {};
    let notesJSON: any = localStorage.getItem('notes');

    if (notesJSON === null) {
      notes = {};
    } else {
      notes = JSON.parse(notesJSON);
    }

    return notes;
  }

  getNotes(id: string): string {
    let notes: any = this.getAllNotes();
    return notes[id];
  }

  saveNotes(id: string, notesText: string) {
    let notes: any = this.getAllNotes();

    let idJSON: any = {};
    idJSON[id] = notesText;

    notes = {
      ...notes,
      ...idJSON,
    };

    localStorage.setItem('notes', JSON.stringify(notes));
  }
}
