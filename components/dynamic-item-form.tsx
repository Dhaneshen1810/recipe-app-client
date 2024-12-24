"use client";
import React, { Dispatch, SetStateAction, useState, useRef } from "react";
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
import { Plus } from "lucide-react";
import { Recipe } from "@/app/page";

const server_url = process.env.SERVER_URL || "http://localhost:8080";

function formatRecipeContent(content: string): Recipe[] {
  try {
    // left console log here for debbuging as the next prompt might not have same issue
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
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, ""]);
    setTimeout(() => {
      inputRefs.current[items.length]?.focus();
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (items[index].trim() !== "") {
        handleAddItem();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const filteredItems = items.filter((item) => item.trim() !== "");

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
              placeholder="New ingredient"
              onChange={(e) => handleItemChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              className="w-full"
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddItem}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New
          </Button>
        </div>
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
