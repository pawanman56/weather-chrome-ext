
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=e805ab4a49c84bad9bf61703211708&aqi=yes&q=';

function getWeatherData(location) {
    const weatherDataURL = baseUrl + location;
    const Http = new XMLHttpRequest();

    Http.responseType = 'json';
    Http.open('GET', weatherDataURL, true);
    Http.send();
    Http.onload = () => {
        const res = Http.response;
    
        if (res.error) {
            weatherLocation.style.display = 'none';
            currentConditionIcon.setAttribute('src', '/icons/icon48.png');
            currentConditionText.innerHTML = '';
            searchError.style.display = 'block';
            currentConditionDetailBlock.style.display = 'none';
            console.log(res.error.message);

        } else {
            searchError.style.display = 'none';
            weatherLocation.style.display = 'flex';
            weatherLocationName.innerHTML = res.location.name;
            weatherLocationLocaltime.innerHTML = new Date(res.location.localtime).toDateString();
            weatherLocationTZ.innerHTML = res.location.tz_id;
            currentConditionIcon.setAttribute('src', 'http:' + res.current.condition.icon);
            currentConditionText.innerHTML = res.current.condition.text;
            currentConditionDetailBlock.style.display = 'block';
            currentConditionLastUpdated.innerHTML = new Date(res.current.last_updated).toLocaleTimeString();
            currentConditionTemp.innerHTML = res.current.temp_c + 'C / ' + res.current.temp_f + 'F';
            currentConditionAQI.innerHTML = 'PM2.5: ' + res.current.air_quality.pm2_5.toFixed(0) + ', PM10: ' + res.current.air_quality.pm10.toFixed(0);
        }
    };
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
    });
}

window.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('currentLocation', ({ currentLocation }) => {
        getWeatherData(currentLocation);
    });
    
    getSearchInput();
})