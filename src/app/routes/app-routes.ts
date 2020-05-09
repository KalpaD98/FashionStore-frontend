import {Routes} from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {CategoryComponent} from '../category/category.component';


const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent}
];

export default appRoutes;
