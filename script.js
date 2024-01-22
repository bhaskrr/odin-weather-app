const API_KEY = '4e14dde50d68efecdae9770d6eb25659';
let loc = 'London';

async function getWeatherData() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${API_KEY}`);
        const weatherInfo = await response.json();
        return weatherInfo;
    } catch (error) {
        alert('No data found!');
    }
}

async function filterWeatherData() {
    try {
        const weatherData = await getWeatherData();
        const data = {};

        data.name = weatherData.name;
        data.country = weatherData.sys.country;
        data.temp = Math.floor(weatherData.main.temp);
        data.max_temp = Math.floor(weatherData.main.temp_max);
        data.min_temp = Math.floor(weatherData.main.temp_min);
        data["feels_like"] = Math.floor(weatherData.main["feels_like"]);
        data.humidity = weatherData.main.humidity;
        data.weather = weatherData.weather[0].main;
        data["wind_speed"] = weatherData.wind.speed;

        return data;
    } catch (error) {
        console.error(error.message);
    }
    // console.log(`${weatherData.clouds.all}% cloudy`);
}

async function displayHandler(){
    const valueObject = await filterWeatherData();
    console.log(valueObject);
    const placeField = document.querySelector('.place');
    const countryField = document.querySelector('.country');
    placeField.textContent = valueObject.name;
    countryField.textContent = valueObject.country;

    const weekDayField = document.querySelector('.weekday');
    const dateField = document.querySelector('.date');
    const monthField = document.querySelector('.month');
    const date = new Date();

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    weekDayField.textContent = weekDays[date.getDay()];
    dateField.textContent = date.getDate();
    monthField.textContent = date.toLocaleString('default', {month: 'short'});

    const mainTempField = document.querySelector('.temp-field');
    mainTempField.innerHTML = `${valueObject.temp}&deg;`;

    const feelsLikeField = document.querySelector('.feels-like');
    feelsLikeField.innerHTML = `Feels like ${valueObject['feels_like']}&deg;`

    const descField = document.querySelector('.desc');
    descField.textContent = valueObject.weather;

    const tempsField = document.querySelector('.minmax-temp');
    tempsField.innerHTML = `${valueObject.max_temp}&deg; / ${valueObject.min_temp}&deg;`

    const windField = document.querySelector('.wind');
    const humidityField = document.querySelector('.humidity');

    windField.textContent = `Wind: ${valueObject.wind_speed} m/s`;
    humidityField.textContent = `Humidity: ${valueObject.humidity}%`
}

displayHandler(); //initial render

const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click',()=>{
    loc = document.querySelector('#searchbox').value;
    displayHandler();
    document.querySelector('#searchbox').value = '';
})