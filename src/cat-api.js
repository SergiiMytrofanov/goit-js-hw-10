const API_KEY = 'live_y0mNDfVCE9xkUb5qW5mnlAceCrWHvsV3CyFTP3EcaVtupXfEQYOcqKoMSGNMlQHt';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_ENDPOINT = 'breeds';
const IMAGES_ENDPOINT = 'images/search';

export function fetchBreeds() {
    return fetch(`${BASE_URL}${BREEDS_ENDPOINT}?${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        
        })
        .catch(error => {
            console.warn(error);
            document.querySelector('.error').removeAttribute('hidden');
        });
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}${IMAGES_ENDPOINT}?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('No cat found for the given breed ID');
            }
            return data[0];
        })
        .catch(error => {
            console.warn(error);
            document.querySelector('.error').removeAttribute('hidden');
        });
}