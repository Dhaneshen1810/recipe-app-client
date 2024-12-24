import { Recipe } from "@/app/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import NutritionDisclaimer from "./nutrition-disclaimer";
import Navbar from "./nav-bar";

interface RecipeListProps {
  recipes: Recipe[];
  setSelectedRecipe: Dispatch<SetStateAction<Recipe | null>>;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  setRecipes,
  setSelectedRecipe,
}) => {
  if (recipes.length <= 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">No recipes found!</p>
          <p className="text-sm text-gray-600">
            We couldn’t find any recipes based on the ingredients provided. Try
            again with different ingredients.
          </p>
        </div>
      </div>
    );
  }

  const handleClick = (recipe: Recipe) => setSelectedRecipe(recipe);

  const handleBack = () => setRecipes([]);

  return (
    <>
      <Navbar handleBack={handleBack} />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Recipe Suggestions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <Card
              key={recipe.name}
              className="shadow-md"
              onClick={() => handleClick(recipe)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div>{recipe.name}</div>
                  <div>
                    <ArrowRight />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="text-sm text-gray-700">
                    <p>
                      <strong>Protein:</strong>{" "}
                      {recipe.nutritional_info.protein}g
                    </p>
                    <p>
                      <strong>Carbs:</strong> {recipe.nutritional_info.carbs}g
                    </p>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>
                      <strong>Total Calories:</strong>{" "}
                      {recipe.nutritional_info.total_calories} kcal
                    </p>
                    <p>
                      <strong>Fat:</strong> {recipe.nutritional_info.fat}g
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          {" "}
          <NutritionDisclaimer />
        </div>
      </div>
    </>
  );
};

export default RecipeList;
