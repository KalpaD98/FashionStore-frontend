import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemCategory} from "../../models/item.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {mimeType} from "../validators/mime-type.validator";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
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
    this.loadForm();
  }

  onSavePost() {
    this.form.reset()
    this.form.clearValidators()
    this.form.clearAsyncValidators()
  }

  loadForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      category: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      image: new FormControl(null, [Validators.required], mimeType)
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
