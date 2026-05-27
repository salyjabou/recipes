import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { StorageService } from '../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class RecipesComponent {

  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private storageService = inject(StorageService);

  recipes: Recipe[] = [];
  searchTerm: string = '';
  allRecipes: any[] = [];
  categories: string[] = [];
  favorites: any[] = [];

  selectedCategory: string = '';

  ngOnInit(): void {

     this.favorites = this.storageService.getFavorites();

     this.recipeService.getRecipes().subscribe((response: any) => {
      this.allRecipes = response.meals ?? [];
      this.recipes = this.allRecipes.slice(0, 10);
    });

     this.recipeService.getRecipesByCategories().subscribe((response: any) => {
      this.categories = response.categories.map((categorie: any) => categorie.strCategory);
    });
  }

  goToDetails(id: string): void {
    this.router.navigate(['/recipe', id]);
  }

  onSearch(): void {

    let filtered = [...this.allRecipes];

      if (this.selectedCategory) {
        filtered = filtered.filter(r => r.strCategory === this.selectedCategory);
      }

      const term = this.searchTerm.trim().toLowerCase();

      if (term) {
        filtered = filtered.filter(r => r.strMeal.toLowerCase().includes(term));
      }

      this.recipes = filtered.slice(0, 10);
  }

  onCategoryChange(): void {

      this.onSearch();

      if (!this.selectedCategory) {
        this.recipes = this.allRecipes.slice(0, 10);
        return;
      }

      const filtered = this.allRecipes.filter((recipe: any) =>
        recipe.strCategory === this.selectedCategory
      );

      this.recipes = filtered.slice(0, 10);
  }

  addToFavorite(id: string): void {
    const favorites =
    this.storageService.getFavorites();

    const index = favorites.findIndex(f => f.id === id);

      if (index === -1) {

        favorites.push({
          id,
          rating: 0
        });
        } else {
          favorites.splice(index, 1);
        }

      this.storageService.setFavorites(favorites);
      this.favorites = favorites;
  }

  isFavorite(id: string): boolean {
    return this.favorites.some(f => f.id === id);
  }
}
