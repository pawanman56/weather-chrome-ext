
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=e805ab4a49c84bad9bf61703211708&aqi=yes&q=';

function getWeatherData(location) {
    let locationName = document.getElementById('title');
    let weatherBlock = document.getElementById('weather');

    const weatherDataURL = baseUrl + location;
    const Http = new XMLHttpRequest();

    Http.responseType = 'json';
    Http.open('GET', weatherDataURL, true);
    Http.send();
    Http.onload = function () {
        const res = Http.response;
        console.log(res);
        weatherBlock.append(res.location);
        locationName.append(res.location.name);
    }
}

function getSearchInput() {
    searchLocation.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            chrome.storage.sync.set({
                currentLocation: e.target.value
            }, function () {
                console.log('Location updated.');
            });

            chrome.storage.sync.get('currentLocation', ({ currentLocation }) => {
                getWeatherData(currentLocation);
            });
        }
    })
}

window.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('currentLocation', ({ currentLocation }) => {
        getWeatherData(currentLocation);
    });
    
    getSearchInput();
})