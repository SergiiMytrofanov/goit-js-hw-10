import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Get the select element
const selectElement = document.querySelector('select.breed-select');
// Get the cat info container
const catInfoContainer = document.querySelector('div.cat-info');

// Function to populate the select options
function populateOptions(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}

// Function to display cat info
function displayCatInfo(cat) {
    // Clear previous cat info
    catInfoContainer.innerHTML = '';

    // Create and append cat image
    const catImage = document.createElement('img');
    catImage.src = cat.url;
    catInfoContainer.appendChild(catImage);

    // Create and append cat name
    const catName = document.createElement('h2');
    catName.textContent = cat.breeds[0].name;
    catInfoContainer.appendChild(catName);

    // Create and append cat description
    const catDescription = document.createElement('p');
    catDescription.textContent = cat.breeds[0].description;
    catInfoContainer.appendChild(catDescription);

    // Create and append cat temperament
    const catTemperament = document.createElement('p');
    catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    catInfoContainer.appendChild(catTemperament);
}

// Event listener for select change
selectElement.addEventListener('change', () => {
    const selectedBreedId = selectElement.value;
    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            displayCatInfo(cat);
        })
        .catch(error => {
            console.error('Failed to fetch cat:', error);
        });
});

// Call fetchBreeds and handle the returned promise
fetchBreeds()
    .then(breeds => {
        populateOptions(breeds);
    })
    .catch(error => {
        console.error('Failed to fetch breeds:', error);
    });