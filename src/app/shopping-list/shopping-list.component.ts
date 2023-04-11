import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.updatedIngredients.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.shoppingListService.selectedingredient.next(index);
  }

}
