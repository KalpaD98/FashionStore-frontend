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
  private BACKEND_URL = "http://localhost:3000/api/dev/items"

  constructor(private http: HttpClient, private router: Router) {
  }

  getItems() {
    this.http.get(this.BACKEND_URL).subscribe()
  }

  getItem(id) {
    this.http.get(this.BACKEND_URL + `/:${id}`).subscribe()
  }

  addItem(item) {
    const itemData = this.getItemData(item)
    return this.http.post<{ message: string, savedItem: Item }>(this.BACKEND_URL, itemData)
  }

  updateItem(item) {
    const id = item.itemId
    const itemData = this.getItemData(item)

    this.http.put(this.BACKEND_URL + `/:${id}`, itemData)
  }

  deleteItem(id) {
    this.http.delete(this.BACKEND_URL + `/:${id}`).subscribe()
  }

  get itemsUpdateListener() {
    return this.itemsUpdated.asObservable()
  }

  getItemData(item) {
    let itemData: Item | FormData
    if (typeof item.image === 'object') {
      itemData = new FormData();

      itemData.append('title', item.title);
      itemData.append('category', item.category);
      itemData.append('type', item.type);
      itemData.append('price', item.price);
      itemData.append('quantity', item.quantity);
      itemData.append('description', item.description);
      itemData.append('image', item.image, item.title);

    } else {
      itemData = {
        itemId: item.itemId,
        title: item.title,
        category: item.category,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        imagePaths: item.image,
      }
    }

    return itemData

  }


}
