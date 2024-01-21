const API_KEY = '4e14dde50d68efecdae9770d6eb25659';
const loc = 'Delhi';

async function getWeatherData(){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${API_KEY}`);
    const weatherInfo = await response.json();
    console.log(weatherInfo);
}

getWeatherData();