
import Notiflix from 'notiflix'
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectElement = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const breedOptions = [];

function renderBreedOptions(breeds) {
    breedOptions.push(
      ...breeds.map(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        return option;
      })
    );
    selectElement.append(...breedOptions);
  }


function displayCatInfo(cat) {
    catInfoContainer.innerHTML = createMarkup(cat);
  }
  
  function createMarkup(cat) {
    return `
    <img src="${cat.url}" alt="Cat Image" class="js-cat-image">
    <h2 class="js-cat-name">${cat.breeds[0].name}</h2>
    <p class="js-cat-text"><strong class= "js-light-text">Description:</strong> ${cat.breeds[0].description}.</p>
    <p class="js-cat-text"><strong class= "js-light-text">Temperament:</strong> ${cat.breeds[0].temperament}.</p>
  `;
  }

selectElement.addEventListener('change', () => {
    const selectedBreedId = selectElement.value;
    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            displayCatInfo(cat);
            document.querySelector('.error').setAttribute('hidden', true);
        })
        .catch(error => {
            console.error('Failed to fetch cat:', error);
            Notiflix.Notify.failure('Failed to fetch cat. Please try again.');
            document.querySelector('.error').removeAttribute('hidden');
        });
});


fetchBreeds()
    .then(breeds => {
        renderBreedOptions(breeds);
    })
    .catch(error => {
        console.error('Failed to fetch breeds:', error);
        Notiflix.Notify.failure('Failed to fetch breeds. Please try again.');
        document.querySelector('.error').removeAttribute('hidden');
    });