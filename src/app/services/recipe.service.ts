import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  getRecipes() {
      return this.http.get(`${this.apiUrl}/search.php?s=a`);
  }

  getRecipeById(id: string) {
  return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`);
  }
}
