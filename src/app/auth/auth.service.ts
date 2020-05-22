import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _authStatusListener = new Subject<boolean>();
  private _isAuthenticated = false;
  private tokenTimer;
  private _userId: string;
  private url = 'http://localhost:3000'

  get token() {
    return this._token;
  }

  get authStatusListener() {
    return this._authStatusListener.asObservable();
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get userId() {
    return this._userId;
  }

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
