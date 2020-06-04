import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  private verificationToken: string;
  displayMessage:string;


  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('verificationToken')) {
        this.verificationToken = paramMap.get('verificationToken');
        this.authService.verifyUserEmail(this.verificationToken).subscribe(
          response => {
            this.displayMessage = response.message
          }
        )
      } else {
        this.displayMessage = 'Verification token is invalid or expired';
      }
    });
  }



}
