import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-password-reset-email',
  templateUrl: './password-reset-email.component.html',
  styleUrls: ['./password-reset-email.component.css']
})
export class PasswordResetEmailComponent implements OnInit {
  bottomSpacing = 170;
  responseMessage: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email

    this.authService.passwordResetEmail(email).subscribe(
      response => {
        this.responseMessage = response.message
      }
    )
    f.resetForm()
  }

}
