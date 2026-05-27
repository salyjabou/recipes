import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe: any = null;
  loading = false;

  ngOnInit(): void {
     this.loadRecipe();
  }
   loadRecipe(): void {

     const id = this.route.snapshot.paramMap.get('id');

      if (!id) return;

      this.loading = true;
      this.recipe = null;

       this.recipeService.getRecipeById(id)
      .subscribe({next: (res: any) => {
          this.recipe = res?.meals?.[0];
          this.loading = false;
        },
        error: () => {
          this.recipe = null;
          this.loading = false;
        }
      });
   }
}
