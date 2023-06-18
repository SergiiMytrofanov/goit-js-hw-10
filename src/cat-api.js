const API_KEY = 'live_y0mNDfVCE9xkUb5qW5mnlAceCrWHvsV3CyFTP3EcaVtupXfEQYOcqKoMSGNMlQHt';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const IMAGES_ENDPOINT = 'images/search';

export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}${IMAGES_ENDPOINT}?breed_ids=${breedId}`;

    return fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
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
        });
}