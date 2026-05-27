import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class RecipesComponent {

  private recipeService = inject(RecipeService);
  private router = inject(Router);

  recipes: Recipe[] = [];
  searchTerm: string = '';
  allRecipes: any[] = [];

  ngOnInit(): void {

     this.recipeService.getRecipes().subscribe((response: any) => {

      this.allRecipes = response.meals ?? [];
      this.recipes = this.allRecipes.slice(0, 10);
    });
  }

  goToDetails(id: string): void {
    this.router.navigate(['/recipe', id]);
  }

  onSearch(): void {

    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.recipes = this.allRecipes.slice(0, 10);
      return;
    }

    const filtered = this.allRecipes.filter((recipe: any) =>
      recipe.strMeal.toLowerCase().includes(term)
    );

    this.recipes = filtered.slice(0, 10);
  }
}
