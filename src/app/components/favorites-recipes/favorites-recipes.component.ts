import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { StorageService } from '../../services/storage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-recipes.html',
  styleUrl: './favorites-recipes.scss',
})
export class FavoritesRecipesComponent implements OnInit {

  private storageService = inject(StorageService);
  private recipeService = inject(RecipeService);

  favorites: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {

     const favoritesData =
      this.storageService.getFavorites();

      if (!favoritesData.length) {
        this.favorites = [];
        return;
      }

      this.loading = true;

      forkJoin(
          favoritesData.map(f => this.recipeService.getRecipeById(f.id)))
        .subscribe({
          next: (results: any[]) => {
           this.favorites = [];

          results.forEach((result: any, index) => {

            if (result.meals) {
              const recipe = result.meals[0];
              recipe.rating = favoritesData[index].rating;
              this.favorites.push(recipe);
            }
          });
            this.loading = false;
          },
          error: () => {
            this.favorites = [];
            this.loading = false;
          }
        });
 }

  updateRating(id: string, rating: number): void {

      const favorites = this.storageService.getFavorites();

      favorites.forEach(favorite => {
        if (favorite.id === id) {
          favorite.rating = rating;
        }
      });

      this.storageService.setFavorites(favorites);

      this.favorites.forEach(recipe => {
        if (recipe.idMeal === id) {
          recipe.rating = rating;
        }
      });

    }
}
