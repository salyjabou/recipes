import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class RecipesComponent {

  private recipeService = inject(RecipeService);

  recipes: Recipe[] = [];

  ngOnInit(): void {

    this.recipeService.getRecipes().subscribe((response: any) => 
        this.recipes = response.meals.slice(0, 10));
  }
}
