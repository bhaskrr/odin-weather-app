const API_KEY = '4e14dde50d68efecdae9770d6eb25659';
const loc = 'Delhi';

async function getWeatherData() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${API_KEY}`);
        const weatherInfo = await response.json();
        return weatherInfo;
    } catch (error) {
        console.error(error.message);
    }
}

async function filterWeatherData() {
    try {
        const weatherData = await getWeatherData();
        const data = {};

        data.name = weatherData.name;
        data.country = weatherData.sys.country;
        data.temp = weatherData.main.temp;
        data.max_temp = weatherData.main.temp_max;
        data.min_temp = weatherData.main.temp_min;
        data["feels_like"] = weatherData.main["feels_like"];
        data.clouds = weatherData.clouds.all;
        data.humidity = weatherData.main.humidity;
        data.weather = weatherData.weather[0].main;
        data["wind_speed"] = weatherData.wind.speed;

        console.log(weatherData);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
    // console.log(`${weatherData.clouds.all}% cloudy`);
    // console.log(`${weatherData.main.temp} degrees`);
    // console.log(`${weatherData.main.temp_max} / ${weatherData.main.temp_min}`);
    // console.log(`feels like ${weatherData.main["feels_like"]} degrees`);
    // console.log(`humidity ${weatherData.main.humidity}%`);
    // console.log(`wind speed ${weatherData.wind.speed} m/s`);

}
filterWeatherData();