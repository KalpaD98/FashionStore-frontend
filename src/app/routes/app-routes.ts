import {Routes} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {CategoryComponent} from '../category/category.component';
import {CreateItemComponent} from "../items/create-item/create-item.component";
import {ItemListComponent} from "../items/item-list/item-list.component";
import {PasswordResetEmailComponent} from "../auth/password-reset-email/password-reset-email.component";
import {PasswordResetComponent} from "../auth/password-reset/password-reset.component";
import {EmailVerificationComponent} from "../auth/email-verification/email-verification.component";


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'password-reset-email', component: PasswordResetEmailComponent},
  {path: 'password-reset/:resetToken', component: PasswordResetComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: "edit/:itemId", component: CreateItemComponent},
  {path: "email-verification/:verificationToken", component: EmailVerificationComponent},
  {path: "all-items", component: ItemListComponent},
];

export default appRoutes;
