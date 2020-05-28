import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Role} from "../../models/user.model";
import {ItemsService} from "../items.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit , OnDestroy {

  private authStatusSub: Subscription;
  private userRole: Role | string = null;
  private IsRoleHigher: boolean

  userIsAuthenticated = false;
  userId: string;
  private isLoading: boolean;

  constructor(
    private itemsService: ItemsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.isAuthenticated
    if (this.userIsAuthenticated) {
      this.userId = this.authService.userId
      this.userRole = this.authService.userRole
      this.userRole !== Role.user ? this.IsRoleHigher = true : this.IsRoleHigher = false
    }


    this.authStatusSub = this.authService.authStatusListener.subscribe(
      authStatus => {
        this.userIsAuthenticated = authStatus;
        this.userId = this.authService.userId;
        this.userRole = this.authService.userRole;
      }
    )


  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


}
