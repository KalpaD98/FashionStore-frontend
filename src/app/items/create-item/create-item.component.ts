import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Item, ItemCategory} from "../../models/item.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {mimeType} from "../validators/mime-type.validator";
import {ItemsService} from "../items.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit, OnDestroy {
  isLoading = false;
  isCreateMode = true
  form: FormGroup;
  itemId: string;
  item: Item;
  recentlyCreatedId: string;
  imagePreview: string;
  categories = Object.keys(ItemCategory).map(key => ItemCategory[key])
  private authStatusSub: Subscription;


  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .authStatusListener
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.loadForm();


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.isCreateMode = false;
        this.itemId = paramMap.get('itemId');
        this.isLoading = true;

        this.itemsService.getItem(this.itemId).subscribe(
          response => {
            this.item = response.item
            this.form.patchValue({
              title: this.item.title,
              category: this.item.category,
              type: this.item.type,
              price: this.item.price,
              quantity: this.item.quantity,
              description: this.item.description,
              image: this.item.imagePath

            })
          }
        )
      } else {
        this.isCreateMode = true;
        this.itemId = null;
      }
      this.isLoading = false;
    });
  }

  onCreateItem(formDirective: FormGroupDirective) {

    if (this.form.invalid) {
      formDirective.resetForm();
      this.form.reset();
      return;
    }

    let item = {
      itemId: this.itemId,
      title: this.form.value.title,
      category: this.form.value.category,
      type: this.form.value.type,
      price: this.form.value.price,
      quantity: this.form.value.quantity,
      description: this.form.value.description,
      image: this.form.value.image,
    }

    this.isLoading = true;

    if (this.isCreateMode) {
      this.itemsService.addItem(item).subscribe(response => {
        this.recentlyCreatedId = response.savedItem._id.toString()
        this.openSnackBar("Item Created: " + this.recentlyCreatedId, 'Close')
      }, error => {
        console.log(error)
        this.openSnackBar("Item Creation failed : " + error, 'Close')
      })
    } else {
      this.itemsService.updateItem(item).subscribe(response => {
        console.log(response)
      })
    }

    formDirective.resetForm();
    this.form.reset();
    this.isLoading = false;
    // window.scroll(0, 0);
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

  //for development purposes only
  generateFormValues() {
    this.form.patchValue({
      title: 'Dummy title',
      category: this.categories[3],
      type: 'dummy type',
      price: 10000,
      quantity: 10,
      description: 'some long generated description => please select image',
    })
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }


}
