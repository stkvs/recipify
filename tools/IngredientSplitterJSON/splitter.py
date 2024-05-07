import json
import re

# Function to separate ingredients and quantities
def separate_ingredients(recipe):
    ingredient_list = []
    quantity_list = []
    for ingredient in recipe["Ingredients"]:
        # Use regular expression to find quantity and ingredient
        match = re.match(r'^([\d.]+(?:\s*(?:tbsp|tsp|fl oz))?)(?:\s+)?(.*)$', ingredient)
        if match:
            quantity_list.append(match.group(1))
            ingredient_list.append(match.group(2))
        else:
            # If no quantity is specified, assume it's 1 unit
            quantity_list.append("1")
            ingredient_list.append(ingredient)
    return ingredient_list, quantity_list

# Read recipes from JSON file
with open("recipes.json", "r") as file:
    recipes = json.load(file)

# Create a new list to store separated data
separated_recipes = []

# Iterate over recipes and separate ingredients and quantities
for recipe in recipes:
    ingredient_list, quantity_list = separate_ingredients(recipe)
    separated_recipe = {
        "Name": recipe["Name"],
        "Description": recipe["Description"],
        "Author": recipe["Author"],
        "Ingredients": [{"Ingredient": ing.strip(), "Quantity": qty.strip()} for ing, qty in zip(ingredient_list, quantity_list)],
        "Method": recipe["Method"]
    }
    separated_recipes.append(separated_recipe)

# Write separated data to a new JSON file
with open("RecipeDataset.json", "w") as outfile:
    json.dump(separated_recipes, outfile, indent=4)

print("Written Data to RecipeDataset.json")
