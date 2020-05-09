import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  collapsed = true;
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}

export class NavComponent {
  
}
