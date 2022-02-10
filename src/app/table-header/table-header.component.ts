import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit {
  @Output() onSortSelect: EventEmitter<number> = new EventEmitter();
  @Output() onSearchbarChange: EventEmitter<string> = new EventEmitter();

  searchTimer: any;

  constructor() {}

  ngOnInit(): void {
    this.onSortSelect.emit(0);
  }

  onSortSelectHandler(event: any) {
    let type = event.target.options.selectedIndex;
    this.onSortSelect.emit(type);
  }

  onSearchChangeHandler(event: any) {
    let searchText = event.target.value;

    // in order to not run the code after each key pressed
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.onSearchbarChange.emit(searchText);
    }, 250);
  }
}
