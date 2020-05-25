import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role, User} from "../models/user.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  private _authStatusListener = new Subject<boolean>();
  // used to make notify other components whenever the auth status change and take actions accordingly

  private _isAuthenticated = false;
  private tokenTimer;
  private _userId: string;
  private _userRole: Role | string
  private _userEmail: string;
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

  get userRole() {
    return this._userRole;
  }

  get userEmail() {
    return this._userEmail
  }

  constructor(private http: HttpClient, private router: Router) {
  }


  signup(user: User) {
    this.http.put<{ message: string, user: any }>(this.url + '/api/dev/users/signup', user).subscribe(
      response => {
        //TODO:auto login
        this.login(user)
      },
      error => {
        this._authStatusListener.next(false);
        this.router.navigate(['/login'])
        //TODO:redirect to sign up with error
      }
    )
  }

  login(user: User) {
    this.http
      .post<{ token: string, expiresIn: number, userId: string, userRole: Role, userEmail: string }>
      (this.url + '/api/dev/users/login', user).subscribe(
      response => {
        this._token = (response.token)

        if (this._token) {
          const expiresIn = response.expiresIn;
          this._userId = response.userId;
          this._userEmail = response.userEmail;
          this._userRole = response.userRole;
          this._isAuthenticated = true;
          this._authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000) // *1000 to convert into mili seconds
          this.saveAuthData(this.token, expirationDate, this.userId, this.userEmail, this.userRole );
          this.router.navigate(['/']);
        }
      },
      error => {
        this._authStatusListener.next(false)
      }
    )
  }

  logout() {
    this._userId = null;
    this._userEmail = null;
    this._userRole = null;
    this._token = null;
    this._isAuthenticated = false;
    this._authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime()

    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000); // convert mili sec to seconds
      this._token = authInformation.token;
      this._isAuthenticated = true;
      this._userId = authInformation.userId;
      this._userEmail = authInformation.userEmail;
      this._userRole = authInformation.userRole;
      this._authStatusListener.next(true);
    }
  }

  protected saveAuthData(token: string, expirationDate: Date, userId: string, userEmail: string, userRole: Role | string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userRole', userRole);
  }

  protected clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');

  }

  protected getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (!token || !expiration) {
      return;
    }

    return {
      token: token,
      expiration: new Date(expiration),
      userId: userId,
      userEmail: userEmail,
      userRole: userRole
    };
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
