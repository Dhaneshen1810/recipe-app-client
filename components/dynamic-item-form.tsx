"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Recipe } from "@/app/page";

const server_url = process.env.SERVER_URL || "http://localhost:8080";

function formatRecipeContent(content: string): Recipe[] {
  try {
    console.log({ content });

    // Sanitize the content: Remove ```json and ```
    const sanitizedContent = content.replace(/```json|```/g, "").trim();

    // Attempt to parse the sanitized JSON
    const parsedData = JSON.parse(sanitizedContent);

    // Ensure parsedData is an array (convert a single object into an array)
    const recipes: Recipe[] = Array.isArray(parsedData)
      ? parsedData
      : [parsedData];

    // Validate and format each recipe
    return recipes.map((recipe) => ({
      name: recipe.name ?? "Unknown Recipe",
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      additional_condiments: Array.isArray(recipe.additional_condiments)
        ? recipe.additional_condiments
        : [],
      prep_instructions: Array.isArray(recipe.prep_instructions)
        ? recipe.prep_instructions
        : [],
      nutritional_info: {
        protein: recipe.nutritional_info?.protein ?? 0,
        carbs: recipe.nutritional_info?.carbs ?? 0,
        fat: recipe.nutritional_info?.fat ?? 0,
        total_calories: recipe.nutritional_info?.total_calories ?? 0,
      },
    }));
  } catch (error) {
    console.error("Failed to parse or format content:", error);
    return [];
  }
}

interface DynamicItemFormProps {
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const DynamicItemForm: React.FC<DynamicItemFormProps> = ({
  setRecipes,
  setIsLoading,
}) => {
  const [items, setItems] = useState<string[]>([""]);
  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const filteredItems = items.filter((item) => item.trim() !== "");
    setSubmittedItems(filteredItems);

    try {
      const response = await axios.post(`${server_url}/recipes`, {
        items: filteredItems,
      });

      const messageContent = response.data.choices[0].message.content;
      setRecipes(formatRecipeContent(messageContent));
    } catch (error) {
      console.error("Error submitting items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <Input
              key={index}
              value={item}
              placeholder={`Item ${index + 1}`}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="w-full"
            />
          ))}
          <Button type="button" variant="outline" onClick={handleAddItem}>
            Add Another Item
          </Button>
        </div>
        {submittedItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Submitted Items:</h3>
            <ul className="list-disc list-inside">
              {submittedItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DynamicItemForm;
