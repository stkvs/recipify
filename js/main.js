const recipeContainer = document.querySelector('.recipe-container');
const generateButton = document.querySelector('.generate-button');

recipeContainer.style.opacity = 0
recipeContainer.style.transition = 'opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1)';

// const infoText = document.createElement('div');
// document.body.appendChild(infoText);
// infoText.innerHTML = `
//                         <p>Welcome to Recipify!</p>
//                         <p>Press Generate to display a random recipe!</p>
//                         `;
// infoText.classList.add('infoText');
// // infoText.style.display = 'none';

window.onload = () => {
    recipeContainer.style.display = 'none';
};

generateButton.addEventListener('click', () => {
    // infoText.style.display = "none";
    recipeContainer.style.display = 'flex';
    recipeContainer.style.opacity = 1;

    checkSelectedIngredients();
});

function checkSelectedIngredients() {
    const checkboxes = document.querySelectorAll('.item input[type="checkbox"]');
    const selectedIngredients = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const pTag = checkbox.parentElement.querySelector('p');
            selectedIngredients.push(pTag.textContent);
        }
    });

    generateRecipes(selectedIngredients);
}

function generateRecipes(selectedIngredients) {
    fetch('js/data/RecipeDataset.json')
        .then(response => response.json())
        .then(data => {
            const filteredRecipes = data.filter(recipe => {
                return recipe.Ingredients.some(ingredient => {
                    return selectedIngredients.includes(ingredient.Ingredient) && ingredient.Checked;
                });
            });

            if (selectedIngredients.length === 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomRecipe = data[randomIndex];

                recipeContainer.innerHTML = `
                    <div class="recipe-title">
                        <h2 class="recipe-name">${randomRecipe.Name}</h2>
                        <p class="recipe-author">${randomRecipe.Author}</p>
                    </div>
                    <hr>
                    <div class="ingredients-container">
                        <h3>Ingredients:</h3>
                        <ul class="ingredients-list">
                            ${randomRecipe.Ingredients.map(ingredient => `<li><b>${ingredient.Quantity}</b> ${ingredient.Ingredient}</b></li>`).join('')}
                        </ul>
                    </div>
                    <hr>
                    <div class="method-container">
                        <h3>Method:</h3>
                        <ul class="method-list">
                            ${randomRecipe.Method.map(step => `<li>${step}</li>`).join(' ')}
                        </ul>
                    </div>
                `;
            } else if (filteredRecipes.length === 0) {
                console.log(filteredRecipes);
                console.log(selectedIngredients);
                try {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomRecipe = data[randomIndex];
                    console.log(randomRecipe.Ingredients);

                    if (randomRecipe && randomRecipe.Ingredients.some(ingredient => selectedIngredients.some(selectedIngredient => ingredient.Ingredient.includes(selectedIngredient)))) {
                        console.log(randomRecipe)

                        recipeContainer.innerHTML = `
                            <div class="recipe-title">
                                <h2 class="recipe-name">${randomRecipe.Name}</h2>
                                <p class="recipe-author">${randomRecipe.Author}</p>
                            </div>
                            <hr>
                            <div class="ingredients-container">
                                <h3>Ingredients:</h3>
                                <ul class="ingredients-list">
                                    ${randomRecipe.Ingredients.map(ingredient => `<li><b>${ingredient.Quantity}</b> ${ingredient.Ingredient}</b></li>`).join('')}
                                </ul>
                            </div>
                            <hr>
                            <div class="method-container">
                                <h3>Method:</h3>
                                <ul class="method-list">
                                    ${randomRecipe.Method.map(step => `<li>${step}</li>`).join(' ')}
                                </ul>
                            </div>
                        `;
                    } else {
                        console.log(false);
                    }

                } catch (error) {
                    console.error(error);
                };
            } else {
                const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
                const randomRecipe = filteredRecipes[randomIndex];

                recipeContainer.innerHTML = `
                    <div class="recipe-title">
                        <h2 class="recipe-name">${randomRecipe.Name}</h2>
                        <p class="recipe-author">${randomRecipe.Author}</p>
                    </div>
                    <hr>
                    <div class="ingredients-container">
                        <h3>Ingredients:</h3>
                        <ul class="ingredients-list">
                            ${randomRecipe.Ingredients.map(ingredient => `<li><b>${ingredient.Quantity}</b> ${ingredient.Ingredient}</b></li>`).join('')}
                        </ul>
                    </div>
                    <hr>
                    <div class="method-container">
                        <h3>Method:</h3>
                        <ul class="method-list">
                            ${randomRecipe.Method.map(step => `<li>${step}</li>`).join(' ')}
                        </ul>
                    </div>
                `;
            }
        });
    };  
