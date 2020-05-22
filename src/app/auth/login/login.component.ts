import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";
import {AuthData} from "../../models/auth-data.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false
  isLoginMode = true
  isConfirmationValid = true
  error: string = null
  private authStatusSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authStatusListener.subscribe((authStatus) => {
      this.isLoading = false;
    });
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      f.resetForm()
      return;
    }
    const email = f.value.email
    const username = f.value.username
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword


    if (!this.isLoginMode && password !== confirmationPassword) {
      this.isConfirmationValid = false
      f.resetForm()
      return;
    }


    if (this.isLoginMode) {
      const authData = {email: email, password: password}
      this.loginUser(authData)

    } else {
      const user = {email: email, password: password, username: username}

      this.signUpUser(user)
    }

  }

  onConfirmation(f: NgForm) {
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword
    this.isConfirmationValid = password === confirmationPassword;
  }

  loginUser(authData: AuthData) {
    this.authService.login(authData)
  }

  signUpUser(user: User) {
    this.authService.signup(user)
  }


  onSwitchMode(f: NgForm) {
    this.isLoginMode = !this.isLoginMode
    f.resetForm()
  }

  onHandleError() {
    this.error = null
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }
}
