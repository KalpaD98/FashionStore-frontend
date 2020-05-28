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
  private itemCount: number;
  private itemsUpdated = new Subject<Item[]>();
  private BACKEND_URL = "http://localhost:3000/api/dev/items"

  constructor(private http: HttpClient, private router: Router) {
  }

  getItems() {
    return this.http.get<{ message: string, numberOfItems: number, items: Item[] }>(this.BACKEND_URL).subscribe(
      responseData => {
        this.items = responseData.items;
        this.itemCount = responseData.numberOfItems;
        this.itemsUpdated.next([...this.items]);
      }
    )
  }

  getItem(id) {
    return this.http.get<{
      message: string,
      item: Item
    }>(this.BACKEND_URL + `/${id}`)
  }

  addItem(item) {
    const itemData = this.getItemData(item, true)
    return this.http.post<{ message: string, savedItem: Item }>(this.BACKEND_URL, itemData)
  }

  updateItem(item) {
    const id = item.itemId
    const itemData = this.getItemData(item, false)

    return this.http.put<{ message: string, item: Item }>(this.BACKEND_URL + `/${id}`, itemData)
  }

  deleteItem(id) {
    this.http.delete(this.BACKEND_URL + `/${id}`).subscribe()
  }

  get itemsUpdateListener() {
    return this.itemsUpdated.asObservable()
  }

  private getItemData(item, isCreateMode) {
    let itemData: Item | FormData
    if (typeof item.image === 'object') {
      itemData = new FormData();
      if (!isCreateMode)
        itemData.append('id', item.itemId);

      itemData.append('title', item.title);
      itemData.append('category', item.category);
      itemData.append('type', item.type);
      itemData.append('price', item.price);
      itemData.append('quantity', item.quantity);
      itemData.append('description', item.description);
      itemData.append('image', item.image, item.title);
      console.log('image file')
    } else {
      itemData = {
        itemId: item.itemId,
        title: item.title,
        category: item.category,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        imagePath: item.imagePath,
      }
      console.log('image link')

    }

    return itemData

  }


}
