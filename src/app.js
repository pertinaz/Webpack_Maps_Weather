/*
El objetivo de este proyecto es desarrollar una aplicación web que combine una API del clima y la API Google Maps. La aplicación permitirá a los usuarios ingresar una ubicación en un input (autocomplete de Google Maps), buscar la ubicación en Google Maps y mostrar el clima actual en esa ubicación.
*/


let map;
let autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 4.79570, lng: -75.68783 },
        zoom: 12
    });

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('location-input'),
        { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
        document.getElementById('location-input').placeholder = 'Enter a location';
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(10);
        fetchWeather(place.geometry.location.lat(), place.geometry.location.lng());
    }
}
// https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true
function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m`;
    

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const weather = data.current;
            const windDiv = document.getElementById('value-three');
            const temperatureDiv = document.getElementById('value-two');
            const precipitationDiv = document.getElementById('value-one');

            const precipitation = weather.precipitation;
            const windspeed = weather.wind_speed_10m;

            precipitationDiv.innerHTML = `
                <p>${precipitation} mm/h</p>
            `;
            temperatureDiv.innerHTML = `
                <p>${weather.temperature_2m} °C</p>
            `;
            windDiv.innerHTML = `
                <p>${windspeed} km/h</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

document.getElementById('search-btn').addEventListener('click', () => {
    onPlaceChanged();
});

window.addEventListener('load', initMap);
