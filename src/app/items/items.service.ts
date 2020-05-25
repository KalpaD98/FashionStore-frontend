import {Injectable} from '@angular/core';
import {Item} from "../models/item.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();
  private BACKEND_URL = "http://localhost:3000"

  constructor(private http: HttpClient, private router: Router) {
  }

  getItems() {
  }

  getItem() {

  }

  addItem(item) {
    const itemData = this.getItemData(item)
    this.http.post<{ message: string, item: Item }>(this.BACKEND_URL + '/api/dev/items', itemData).subscribe(
      responseData => {
        console.log(responseData)

      }, error => {
        console.log(error)
      }
    )
  }

  updateItem() {

  }

  deleteItem() {

  }

  get itemsUpdateListener() {
    return this.itemsUpdated.asObservable()
  }

  getItemData(item) {
    const itemData = new FormData();
    itemData.append('title', item.title);
    itemData.append('category', item.category);
    itemData.append('type', item.type);
    itemData.append('price', item.price);
    itemData.append('quantity', item.quantity);
    itemData.append('description', item.description);
    itemData.append('image', item.image, item.title);
    return itemData
  }


}
