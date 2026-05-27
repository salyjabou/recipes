import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesRecipes } from './favorites-recipes';

describe('FavoritesRecipes', () => {
  let component: FavoritesRecipes;
  let fixture: ComponentFixture<FavoritesRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
