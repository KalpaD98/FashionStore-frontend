import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  bottomSpacing: any;
  isConfirmationValid = false;
  resetToken:string;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('resetToken')) {
        this.resetToken = paramMap.get('resetToken');
      }
    });
  }


  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword

    if (password !== confirmationPassword) {
      this.isConfirmationValid = false
      return;
    }
  }

  onConfirmation(f: NgForm) {
    const password = f.value.password
    const confirmationPassword = f.value.confirmationPassword
    this.isConfirmationValid = password === confirmationPassword;
  }
}
