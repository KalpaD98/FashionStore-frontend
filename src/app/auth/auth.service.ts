import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient, private router: Router) {
  }


  signup(user: User) {
    this.http.post<{ message: string, user: any }>(this.url + '/auth/signup', user).subscribe(
      response => {
        //TODO:auto login
        console.log(response)
      },
      error => {
        //TODO:redirect to sign up with error

      }
    )
  }

  login(user: User) {
    this.http.post<{ token: string, expiresIn: number, userId: string }>(this.url + '/auth/login', user).subscribe(
      response => {
        this._token = (response.token)

        if (this._token) {
          const expiresIn = response.expiresIn;
          this._userId = response.userId;
          this._isAuthenticated = true;
          this._authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000) // *1000 to convert into mili seconds
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      },
      error => {
        this._authStatusListener.next(false)
      }
    )
  }


  autoAuthUser(){
    const authInformation = this.getAuthData()
  }

  protected saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  protected clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');

  }

  protected getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expiration) {
      return;
    }

    return {
      token: token,
      expiration: new Date(expiration),
      userId: userId
    };
  }


  logout() {
    this._userId = null;
    this._token = null;
    this._isAuthenticated = false;
    this._authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
