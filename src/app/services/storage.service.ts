  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

   setFavorites(favorites: any[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
