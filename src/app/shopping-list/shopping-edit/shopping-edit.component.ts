import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f')
  shoppingEditForm: NgForm;


  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.selectedingredient.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredientById(index);
        this.shoppingEditForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
    )
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(!this.editMode)
      this.shoppingListService.addIngredient(newIngredient);
    else
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onClear() {
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngrdient(this.editedItemIndex);
    this.onClear();
  }

}
