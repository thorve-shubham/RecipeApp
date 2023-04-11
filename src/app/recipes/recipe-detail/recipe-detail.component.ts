import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  public recipe:Recipe;
  public id:number;

  constructor(private shoppingListService: ShoppingListService,
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = Number.parseInt(params.id);
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
