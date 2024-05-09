// Read the IngredientsJSON.json file
fetch('./js/data/IngredientsJSON.json')
    .then(response => response.json())
    .then(ingredients => {
        // Categories to create div elements for
        const categories = ['Spices', 'Fruits', 'Vegetables', 'Proteins', 'Grains', 'Dairy/Oils'];

        // Create div element for ingredient-selector
        const ingredientSelectorDiv = document.createElement('div');
        ingredientSelectorDiv.classList.add('ingredient-selector');

        const ingredientSelectorTitle = document.createElement('h1');
        ingredientSelectorTitle.textContent = 'Select Ingredients';
        ingredientSelectorDiv.appendChild(ingredientSelectorTitle);

        // Create div elements for each category
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('ingredient-category');
            categoryDiv.id = `${category}-category`;

            const categoryTitle = document.createElement('div')
            categoryTitle.classList.add('category-title');
            categoryDiv.appendChild(categoryTitle);

            const categoryTitleText = document.createElement('h2');
            categoryTitleText.textContent = category;
            categoryTitle.appendChild(categoryTitleText);

            const searchInput = document.createElement('input');
            searchInput.classList.add('search-input');
            searchInput.id = `${category}-search`;
            searchInput.setAttribute('type', 'text');
            searchInput.setAttribute('placeholder', `Search ${category}`);
            categoryTitle.appendChild(searchInput);

            // Create div elements for each ingredient within the category
            ingredients[category].forEach(ingredient => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('id', ingredient);

                const paragraph = document.createElement('p');
                paragraph.textContent = ingredient;

                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(paragraph);

                categoryDiv.appendChild(itemDiv);
            });

            ingredientSelectorDiv.appendChild(categoryDiv);
        });

        document.body.appendChild(ingredientSelectorDiv);
    })
    .catch(error => {
        console.error('Error fetching ingredients:', error);
    });
