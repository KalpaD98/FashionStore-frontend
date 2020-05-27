import {Routes} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {CategoryComponent} from '../category/category.component';
import {CreateItemComponent} from "../items/create-item/create-item.component";
import {ItemListComponent} from "../items/item-list/item-list.component";


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: "edit/:itemId", component: CreateItemComponent},
  {path: "all-items", component: ItemListComponent},
];

export default appRoutes;
