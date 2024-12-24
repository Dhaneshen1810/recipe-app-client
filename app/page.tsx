"use client";
import DynamicItemForm from "@/components/dynamic-item-form";
import RecipeFullDetails from "@/components/recipe-full-details";
import RecipeList from "@/components/recipe-list";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

interface NutritionalInfo {
  protein: number;
  carbs: number;
  fat: number;
  total_calories: number;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  additional_condiments: string[];
  prep_instructions: string[];
  nutritional_info: NutritionalInfo;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex gap-2 items-center">
          <LoaderPinwheel className="animate-spin" size={48} />
          <div className="text-xl">Fetching recipes...</div>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <RecipeFullDetails
        recipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    );
  }

  if (recipes.length > 0) {
    return (
      <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
    );
  }

  return (
    <DynamicItemForm setRecipes={setRecipes} setIsLoading={setIsLoading} />
  );
}
