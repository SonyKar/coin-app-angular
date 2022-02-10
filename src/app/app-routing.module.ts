import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinInfoComponent } from './coin-info/coin-info.component';
import { CoinTableComponent } from './coin-table/coin-table.component';

const routes: Routes = [
  { path: '', component: CoinTableComponent },
  { path: 'coin/:id', component: CoinInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
