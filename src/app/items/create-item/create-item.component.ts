import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ItemCategory} from "../../models/item.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {mimeType} from "../validators/mime-type.validator";
import {ItemsService} from "../items.service";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit, OnDestroy {
  isLoading = false;
  isCreateMode = true
  form: FormGroup;
  postId:string;
  imagePreview: string;
  categories = Object.keys(ItemCategory).map(key => ItemCategory[key])
  private authStatusSub: Subscription;


  constructor(private authService: AuthService,private itemsService:ItemsService) {

  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .authStatusListener
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.loadForm();
  }

  onCreateItem(formDirective: FormGroupDirective) {

    if (this.form.invalid) {
      formDirective.resetForm();
      this.form.reset();
      return;
    }

    let item  = {
      postId:this.postId,
      title:this.form.value.title,
      category:this.form.value.category,
      type:this.form.value.type,
      price:this.form.value.price,
      quantity:this.form.value.quantity,
      description:this.form.value.description,
      image:this.form.value.image,
    }

    this.isLoading = true;

    if (this.isCreateMode) {
      this.itemsService.addItem(item);
    } else {
      this.itemsService.updateItem();
    }

    formDirective.resetForm();
    this.form.reset();
    this.isLoading = false;
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

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }
}
