
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectElement = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');


function populateOptions(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}


function displayCatInfo(cat) {
 
    catInfoContainer.innerHTML = '';


    const catImage = document.createElement('img');
    catImage.src = cat.url;
    catInfoContainer.appendChild(catImage);


    const catName = document.createElement('h2');
    catName.textContent = cat.breeds[0].name;
    catInfoContainer.appendChild(catName);

    
    const catDescription = document.createElement('p');
    catDescription.textContent = cat.breeds[0].description;
    catInfoContainer.appendChild(catDescription);

    
    const catTemperament = document.createElement('p');
    catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}.`;
    catInfoContainer.appendChild(catTemperament);
}


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