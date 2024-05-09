const recipeContainer = document.querySelector('.recipe-container');
const generateButton = document.querySelector('.generate-button');

recipeContainer.style.opacity = 0
recipeContainer.style.transition = 'opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1)';

const infoText = document.createElement('div');
document.body.appendChild(infoText);
infoText.innerHTML = `
                        <p>Welcome to Recipify!</p>
                        <p>Press Generate to display a random recipe!</p>
                        `;
infoText.classList.add('infoText');
// infoText.style.display = 'none';

window.onload = () => {
    recipeContainer.style.display = 'none';
};

generateButton.addEventListener('click', () => {
    infoText.style.display = "none";
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

    setTimeout(() => {
        recipeContainer.style.opacity = 1;
    }, 500);
});