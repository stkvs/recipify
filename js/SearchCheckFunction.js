window.onload = () => {
    setTimeout(() => {
        const searchInputs = document.querySelectorAll('.search-input');

        searchInputs.forEach(searchInput => {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const categoryId = searchInput.id.split('-')[0]; // Get the category id from the search input id
                const container = document.getElementById(`${categoryId}-category`); // Use the category id to find the container
                const items = container.querySelectorAll('.item');

                items.forEach(item => {
                    const itemName = item.querySelector('p').textContent.toLowerCase();

                    if (itemName.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else if (searchTerm === '') {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        const itemDivs = document.querySelectorAll('.item');
        itemDivs.forEach(itemDiv => {
            const checkbox = itemDiv.querySelector('input[type="checkbox"]');
            
            if (checkbox) { // Add a check to ensure checkbox is not null
                itemDiv.addEventListener('click', () => {
                    console.log("Checkbox Clicked")
                    checkbox.checked = !checkbox.checked;
                });
            }
        });
    }, 2000);
};

console.log("Ingredients Loaded + Search Check Function Loaded");
