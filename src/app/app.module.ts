import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinTableComponent } from './coin-table/coin-table.component';
import { CoinItemComponent } from './coin-item/coin-item.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortPipe } from './sort-pipe/sort.pipe';
import { SearchPipe } from './search-pipe/search.pipe';
import { CoinInfoComponent } from './coin-info/coin-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CoinTableComponent,
    CoinItemComponent,
    NavigationBarComponent,
    TableHeaderComponent,
    SortPipe,
    SearchPipe,
    CoinInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
