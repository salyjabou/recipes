#Recipes project

## 1. Project 

The goal of this project was to build a recipe application that allows users to browse recipes from a public API, search and filter them, and manage a personal list of favorites with ratings stored locally.

The main focus was to keep the application simple, functional and modern.

## 2. Architecture Decisions

The application was structured using a modular Angular architecture:

* Services

  * `RecipeService`: handles API communication with TheMealDB
  * `StorageService`: manages localStorage operations (favorites, ratings)

* Components

  * `RecipesComponent`: displays the recipe list, search, and filters
  * `RecipeDetailsComponent`: shows detailed recipe information
  * `FavoritesRecipesComponent`: displays saved favorite recipes and ratings

* Routing

  * Simple Angular routing was used to navigate between components

## 3. Development Steps & Reflections

### Step 1 – Recipe List

The first step was to display recipes from the API.
A default list of 10 recipes was shown to keep the UI simple and fast.

### Step 2 – Recipe Details

A detail page was added to display full information about a selected recipe.

### Step 3 – Search Feature

A search input was implemented to filter recipes by name.

### Step 4 – Category Filter

A dropdown filter was added to allow users to filter recipes by category.
This filter works together with the search functionality.

### Step 5 – Favorites System

A favorites feature was implemented using localStorage.
Users can add or remove recipes from their favorites list that is displayed on a separate component.

### Step 6 – Rating System

A rating system was added to allow users to rate their favorite recipes from 1 to 5 stars.
Ratings are stored in localStorage alongside favorites.

## 4. Technical Choices

* Angular Standalone Components were used to simplify module structure
* localStorage was chosen for persistence
* RxJS forkJoin was used to handle multiple API requests in favorites page

## 5. Testing Approach

A basic unit test was added for the recipe list component.
The goal was to verify:

* Component creation
* Recipe loading from service

Testing was kept minimal due to time constraints and project scope.

## 6. Possible Improvements

If more time was available, i could have improved:

* Add pagination for better performance
* Improve UI/UX with animations and loading skeletons
* Add a global state management solution like Signals
* Improve error handling for API failures

## 7. Conclusion

The focus was on building a clean, functional application with a simple and maintainable structure while keeping features modular and easy to extend.

