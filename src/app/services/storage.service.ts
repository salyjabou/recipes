import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

   getFavorites(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

   setFavorites(ids: string[]): void {
    localStorage.setItem('favorites', JSON.stringify(ids));
  }
}
