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

  getItem(){

  }

  addItem(){

  }

  updateItem(){

  }

  deleteItem(){

  }

  get itemsUpdateListener(){
    return this.itemsUpdated.asObservable()
  }


}
