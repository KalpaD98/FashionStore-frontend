import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) {
  }


  signup(user: User) {
    this.http.post(this.url + '/auth/signup', user).subscribe(
      value => {
        //TODO:auto login
        console.log(value)
      },
      error => {
        //TODO:redirect to sign up with error

      }
    )
  }

  login(user: User) {
    this.http.post(this.url + '/auth/login', user).subscribe(
      value => {
        console.log(value)
      },
      error => {

      }
    )
  }


}
