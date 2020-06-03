import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-password-reset-email',
  templateUrl: './password-reset-email.component.html',
  styleUrls: ['./password-reset-email.component.css']
})
export class PasswordResetEmailComponent implements OnInit {
  bottomSpacing = 170;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      f.resetForm()
      return;
    }
    const email = f.value.email

  }

}
