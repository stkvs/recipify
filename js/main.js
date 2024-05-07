const recipeContainer = document.querySelector('.recipe-container');
const generateButton = document.querySelector('.generate-button');

window.onload = () => {
    recipeContainer.style.display = 'none';
};

generateButton.addEventListener('click', () => {
    recipeContainer.style.display = 'flex';

    fetch('js/data/RecipeDataset.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomRecipe = data[randomIndex];
            // console.log(randomRecipe);

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
        })
        .catch(error => {
            console.error('Error:', error);
        });
});