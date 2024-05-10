const recipeContainer = document.querySelector('.recipe-container');
const generateButton = document.querySelector('.generate-button');

recipeContainer.style.opacity = 0
recipeContainer.style.transition = 'opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1)';
recipeContainer.style.display = 'none';

function checkSelectedIngredients() {
    const checkboxes = document.querySelectorAll('.item input[type="checkbox"]');
    const selectedIngredients = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const pTag = checkbox.parentElement.querySelector('p');
            selectedIngredients.push(pTag.textContent);
        }
    });

    console.log(selectedIngredients);

    if (selectedIngredients.length === 0) {
        generateRandomRecipe();
    }
    else {
        searchRecipes(selectedIngredients);
    }
}

function generateRandomRecipe() {
    try {
        fetch('./js/data/RecipeDataset.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomRecipe = data[randomIndex];
            recipeContainer.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;

            setTimeout(() => {
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
            }, 1000);
        });
    } catch (error) {
        console.error(error);
    };
}

function searchRecipes(selectedIngredients) {
    fetch('./js/data/RecipeDataset.json')
        .then(response => response.json())
        .then(data => {
            const filteredRecipes = data.filter(recipe => {
                const recipeIngredients = recipe.Ingredients.map(ingredientObj => ingredientObj.Ingredient);
                return selectedIngredients.some(ingredient => recipeIngredients.includes(ingredient));
            });

            console.log(filteredRecipes);
            sortRecipesBySimilarity(selectedIngredients, filteredRecipes)
        })
        .catch(error => {
            console.error('Error fetching recipe data:', error);
        });
        
}

function sortRecipesBySimilarity(selectedIngredients, filteredRecipes) {
    let recipeIndex = 0;

    const sortedRecipes = filteredRecipes.map(recipe => {
        const recipeIngredients = recipe.Ingredients.map(ingredientObj => ingredientObj.Ingredient);
        const similarity = selectedIngredients.filter(ingredient => recipeIngredients.includes(ingredient)).length;
        return { ...recipe, similarity };
    });

    sortedRecipes.sort((a, b) => b.similarity - a.similarity);

    console.log(sortedRecipes);
    displayRecipe(sortedRecipes ,recipeIndex);
}

function displayRecipe(sortedRecipes, recipeIndex) {
    const recipeHTML = `
        <div class="recipe-title">
            <h2 class="recipe-name">${sortedRecipes[recipeIndex].Name}</h2>
            <p class="recipe-author">${sortedRecipes[recipeIndex].Author}</p>
        </div>
        <hr>
        <div class="ingredients-container">
            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
                ${sortedRecipes[recipeIndex].Ingredients.map(ingredient => `<li><b>${ingredient.Quantity}</b> ${ingredient.Ingredient}</b></li>`).join('')}
            </ul>
        </div>
        <hr>
        <div class="method-container">
            <h3>Method:</h3>
            <ul class="method-list">
                ${sortedRecipes[recipeIndex].Method.map(step => `<li>${step}</li>`).join(' ')}
            </ul>
        </div>

        <div class="button-container">
            <button class="back-button">Previous Recipe</button>
            <button class="next-button">Next Recipe</button>
        </div>
    `;

    recipeContainer.innerHTML = recipeHTML;

    const nextButton = document.querySelector('.next-button');
    const backButton = document.querySelector('.back-button');

    if (recipeIndex <= 0) {
        let Button = document.querySelector('.back-button');
        Button.style.display = 'none';
    }

    nextButton.addEventListener('click', () => {
        recipeIndex++;
        displayRecipe(sortedRecipes, recipeIndex);
        if (recipeIndex >= sortedRecipes.length - 1) {
            let Button = document.querySelector('.next-button');
            Button.style.display = 'none';
        }
    });

    backButton.addEventListener('click', () => {
        recipeIndex--;
        displayRecipe(sortedRecipes, recipeIndex);
    });
}

generateButton.addEventListener('click', () => {
    recipeContainer.style.display = 'flex';
    recipeContainer.style.opacity = 1;

    checkSelectedIngredients();
});

