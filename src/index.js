import { format, fromUnixTime, getDay, parse, parseISO } from 'date-fns';
import './style.css';

//Initialize location
let location = 'Phoenix';

let cityDiv = document.querySelector('.city');
let locationBtn = document.querySelector('#locationBtn');
let locationInput = document.querySelector('#location');
let conditionText = document.querySelector('.conditionText');
let currentTemp = document.querySelector('.currentTemp');
let feelsLike = document.querySelector('.feelsLike');
let localTime = document.querySelector('.localTime');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let uv = document.querySelector('.uv');
let sunRise = document.querySelector('.sunRise');
let sunSet = document.querySelector('.sunSet');
let dayOfWeek = document.querySelector('.dayOfWeek');
let dateDiv = document.querySelector('.date'); 
let conditionIconContainer = document.querySelector('.conditionIconContainer');

//Search function to change city for weather data
locationBtn.addEventListener('click', () => {
    updateWeather();
});

locationInput.addEventListener('keyup', ({key}) => {
    if (key === "Enter"){
    updateWeather();
    }
});

const fetchWeather = async () => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=d11fdeb9923544a6909211432232504&q=' + location + "&days=3")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            //successful response
            mode: 'cors'
            console.log(response);
            cityDiv.textContent = response.location.name;
            dayOfWeek.textContent = format(parseISO(unixFormTime(response.location.localtime)), 'cccc');
            dateDiv.textContent = format(parseISO(unixFormTime(response.location.localtime)), 'PPP');
            localTime.textContent = format(parseISO(unixFormTime(response.location.localtime)), 'p');
            conditionText.textContent = response.current.condition.text;
            currentTemp.textContent = response.current.temp_f + " °F";
            feelsLike.textContent = "Feels like " + response.current.feelslike_f + " °F";
            humidity.textContent = "Humidity: " + response.current.humidity + "%";
            wind.textContent = "Wind: " + response.current.wind_mph + " mph " + response.current.wind_dir;
            uv.textContent = " UV Index: " + response.current.uv;
            sunRise.textContent = formTime(response.forecast.forecastday[0].astro.sunrise) + " Sun Rise";
            sunSet.textContent = formTime(response.forecast.forecastday[0].astro.sunset) + " Sun Set";

            //set icon for current condition
            conditionIconContainer.textContent = '';
            let icon = document.createElement('img');
            icon.setAttribute('src', "https:" + response.current.condition.icon);
            conditionIconContainer.appendChild(icon);
        })
        .catch(function(err) {
            //error
            console.log(err);
            cityDiv.textContent = location + " is NOT a location! Try again, please.";
        });
};

fetchWeather();

//Functionality for Search button
const updateWeather = function () {
    location = locationInput.value;
    console.log(location);
    fetchWeather();
    locationInput.value = '';
};

//Cuts zero pad off of time
const formTime = function (time) {
    if (time.charAt(0) === '0') {
        let newTime = time.substring(1);
        return newTime;
    } else {
        return time;
    }
}

//Format's time to Unix Standard
const unixFormTime = function (time) {
    if (time.length < 16) {
        let newTime = time.slice(0, 11) + '0' + time.slice(11);
        return newTime;
    } else {
        return time;
    }
}