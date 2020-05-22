import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
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
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword

    if (!this.isLoginMode && password !== confirmationPassword) {
      this.isConfirmationValid = false
      f.resetForm()
      return;
    }
    const user = {email: email, password: password}

    if (this.isLoginMode) {
      this.loginUser(user)

    } else {
      this.signUpUser(user)
    }


    console.log(`${email} ${password} ${confirmationPassword}`)

  }

  onConfirmation(f: NgForm) {
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword
    this.isConfirmationValid = password === confirmationPassword;
  }

  loginUser(user: User) {
    this.authService.login(user)
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
