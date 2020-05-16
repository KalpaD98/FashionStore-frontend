import {Routes} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {CategoryComponent} from '../category/category.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent}
];

export default appRoutes;
