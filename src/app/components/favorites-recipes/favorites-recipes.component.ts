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

     const ids = this.storageService.getFavorites();

  if (!ids || ids.length === 0) {
    this.favorites = [];
    return;
  }

  this.loading = true;
    forkJoin(
      ids.map(id => this.recipeService.getRecipeById(id))
    )
    .subscribe({
      next: (results: any[]) => {

        this.favorites = results
          .map(r => r?.meals?.[0])
          .filter(r => r != null);

        this.loading = false;
      },
      error: () => {
        this.favorites = [];
        this.loading = false;
      }
    });
  }
}
