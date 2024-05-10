document.body.style.overflowY = 'hidden';

// Create the button
const button = document.createElement('button');
button.classList.add('info-button');
button.textContent = 'info';

// Create the info box
const infoBox = document.createElement('div');
infoBox.classList.add('info-box');

const cover = document.createElement('div');
cover.classList.add('cover');
document.body.appendChild(cover);

infoBox.innerHTML = `
    <div class="info-box-title">
        <button class="close-button">x</button>
        <h2>Welcome to Recipify!</h2>
    </div>
    <p>Select some ingredients and generate to generate a recipe based on the selected ingredients</p>
    <p class="italic-p"><i>If you're feeling adventurous and want a random recipe don't select any ingredients and click Generate</i></p>
    <div class="current-issues">
        <h4>Patch: 1.2.2</h4>
        <ul>
            <li><p>This will generate a recipe along the selection of your ingredients but will add extra ingredients</p></li>
        </ul>
    </div>
    <p class="beta-text">Please note this is still majorly in Beta and may experience some issues</p>
    <p>If you have any recipes you would like me to add contact me via <a href="mailto:mantas@stkvs.com">My Email</a></p>
`;

// Add event listener to the button
button.addEventListener('click', () => {
    infoBox.style.display = 'flex';
    cover.style.display = 'block';

    document.body.style.overflowY = 'hidden';
});

const closeButton = infoBox.querySelector('.close-button');

// Add event listener to the close button
closeButton.addEventListener('click', () => {
    infoBox.style.display = 'none';
    cover.style.display = 'none';

    document.body.style.overflowY = 'auto';
});

// Append the button and info box to the document body
document.body.appendChild(button);
document.body.appendChild(infoBox);