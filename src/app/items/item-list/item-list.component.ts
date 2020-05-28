import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Item} from "../../models/item.model";
import {ItemsService} from "../items.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  isLoading = false;

  totalItems = 0;
  // itemsPerPage = 2;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];

  private itemsSub: Subscription;


  constructor(private itemsService: ItemsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.itemsService.getItems();

    this.itemsSub = this.itemsService.itemsUpdateListener.subscribe(items => {
      this.isLoading = false
      this.items = items
    })
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }

}
