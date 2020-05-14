import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false
  isLoginMode = true
  isConfirmationValid = true
  error: string = null

  constructor() {
  }

  ngOnInit(): void {
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

    console.log(`${email} ${password} ${confirmationPassword}`)

  }

  onConfirmation(f: NgForm) {
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword
    this.isConfirmationValid = password === confirmationPassword;
  }

  loginUser() {

  }

  signUpUser() {

  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onHandleError() {
    this.error = null
  }
}
