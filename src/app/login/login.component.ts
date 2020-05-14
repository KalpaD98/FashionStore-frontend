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
      f.reset()
      return;
    }

    const email = f.value.email
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword

    if(password !== confirmationPassword){
      this.isConfirmationValid = false
      return;
    }

    console.log(`${email} ${password} ${confirmationPassword}`)

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onHandleError() {
    this.error = null
  }
}
