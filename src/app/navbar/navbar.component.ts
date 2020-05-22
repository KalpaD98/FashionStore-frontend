import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
  }

  collapsed = true;
  isAuthenticated = false;
  private authStatusSubscription: Subscription;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated
    this.authStatusSubscription = this.authService.authStatusListener.subscribe(
      authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
  }
}

export class NavComponent {

}
