import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemCategory} from "../../models/item.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import validate = WebAssembly.validate;
import {mimeType} from "../validators/mime-type.validator";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  bottomSpacing = 0;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  categories = Object.keys(ItemCategory).map(key => ItemCategory[key])
  private authStatusSub: Subscription;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .authStatusListener
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onSavePost() {
  }

  onImagePicked($event: Event) {

  }
}
