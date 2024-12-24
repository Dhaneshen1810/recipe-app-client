import { Recipe } from "@/app/page";
import NutritionDisclaimer from "./nutrition-disclaimer";
import { Dispatch, SetStateAction } from "react";
import Navbar from "./nav-bar";

interface RecipeFullDetailsProps {
  recipe: Recipe;
  setSelectedRecipe: Dispatch<SetStateAction<Recipe | null>>;
}

const RecipeFullDetails: React.FC<RecipeFullDetailsProps> = ({
  recipe,
  setSelectedRecipe,
}) => {
  const handleBack = () => setSelectedRecipe(null);

  return (
    <>
      <Navbar handleBack={handleBack} />
      <div className="flex flex-col space-y-4 p-4">
        <h1 className="text-2xl font-bold">{recipe.name}</h1>

        <div>
          <h2 className="text-lg font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Additional Condiments</h2>
          <ul className="list-disc list-inside">
            {recipe.additional_condiments.map((condiment, index) => (
              <li key={index}>{condiment}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Preparation Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.prep_instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Nutritional Information</h2>
          <p>
            <strong>Protein:</strong> {recipe.nutritional_info.protein}g
          </p>
          <p>
            <strong>Carbs:</strong> {recipe.nutritional_info.carbs}g
          </p>
          <p>
            <strong>Fat:</strong> {recipe.nutritional_info.fat}g
          </p>
          <p>
            <strong>Total Calories:</strong>{" "}
            {recipe.nutritional_info.total_calories} kcal
          </p>
        </div>
        <NutritionDisclaimer />
      </div>
    </>
  );
};

export default RecipeFullDetails;
