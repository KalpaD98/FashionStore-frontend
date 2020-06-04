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
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false
  isLoginMode = true
  isConfirmationValid = true
  error: string = null
  private authStatusSubscription: Subscription;
  bottomSpacing = 231
  responseMessage: string

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authStatusListener.subscribe((authStatus) => {
      this.isLoading = false;
    });
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
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

  loginUser(user: User) {
    this.authService.login(user)
  }

  signUpUser(user: User) {
    this.authService.signup(user).subscribe(
      response => {
        this.isLoginMode = true
        this.responseMessage = response.message
      },
      error => {
        this.authService.nextAuthStatusListener(false)
        this.isLoginMode = false

        //TODO:redirect to sign up with error
      }
    )
  }


  onSwitchMode(f: NgForm) {
    this.isLoginMode = !this.isLoginMode
    this.bottomSpacing = this.bottomSpacing == 231 ? 118 : 231
    f.resetForm()
  }

  onHandleError() {
    this.error = null
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }
}
