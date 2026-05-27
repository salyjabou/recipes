import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./components/recipes/recipes.component')
        .then(m => m.RecipesComponent)
  },

  {
    path: 'recipe/:id',
    loadComponent: () => import('./components/recipe-details/recipe-details.component')
        .then(m => m.RecipeDetailsComponent)
  }

];
