export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number | ProductCategory;
}

export interface cookbookRecipe {
  name: string;
  note: string;
  ingredients: cookbookRecipeIngredient[] | number;
}

export interface ingredient {
  id: number;
  name: string;
  unit: string;
}

export interface cookbookRecipeIngredient {
  recipe: cookbookRecipe | number;
  ingredient: ingredient[] | number;
  quantity: number;
}

