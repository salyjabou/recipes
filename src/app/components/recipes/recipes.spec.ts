import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RecipesComponent } from './recipes.component';
import { RecipeService } from '../../services/recipe.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Recipes', () => {

  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RecipesComponent,
        RouterTestingModule
      ],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            getRecipes: () => of({
              meals: [
                {
                  idMeal: '1',
                  strMeal: 'Pizza',
                  strMealThumb: '',
                  strCategory: 'Food'
                }
              ]
            }),

            // ✅ FIX IMPORTANT
            getRecipesByCategories: () => of({
              meals: [
                {
                  idMeal: '1',
                  strMeal: 'Pizza',
                  strMealThumb: '',
                  strCategory: 'Food'
                }
              ]
            })

          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recipes', () => {
    expect(component.recipes.length).toBe(1);
  });

});
