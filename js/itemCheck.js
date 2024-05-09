document.addEventListener('DOMContentLoaded', () => {
    const itemDivs = document.querySelectorAll('.item');

    itemDivs.forEach(itemDiv => {
        const checkbox = itemDiv.querySelector('input[type="checkbox"]');
        
        itemDiv.addEventListener('click', () => {
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });
    });
});