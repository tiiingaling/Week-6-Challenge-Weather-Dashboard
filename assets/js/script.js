//pseudo code

//search input (location/city)
//5 day current and future weather conditions for that city
//city added to search history
//city name. date. icon of weather, temperature, humidity wind speed
//click on city in history, showed the conditions again

//end


var WEATHER_API_URL = 'https://api.openweathermap.org';
var WEATHER_API_KEY = 'd91f911bcf2c0f925fb6535547a5ddc9';
var searchButton = document.getElementById('search');

//arrow function for more compact function coding
//takes location name from user input 
const getLocation = () => {
    var locationInput = document.getElementById('location')
    var userLocation = locationInput.value;
    console.log(userLocation)

    lookupLocation(userLocation);
};


//fetch the lon,lat data from LocationInput
var lookupLocation = (search) => {
    var apiURL = `${WEATHER_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

        var location = data[0];
        
        displayWeather(location)

        console.log(location);
    })    
};


//displays location name
var displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = (weatherData.name)
    getWeather(weatherData.lat, weatherData.lon)
};

//fetch data for location from API
var getWeather = (lat, lon) => {
    var apiUrl = `${WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrent(data)

            console.log('Weather Data', data)

            displayCurrent(data);
            displayForecast(data);

        })
}


//temperature
//wind speed
//uvi
//humidity
//weather icon



// fetches the individual values for weather metris
var displayCurrent = (weatherData) => {

    var currentData = weatherData.current

    var temp = currentData.temp;
    var windSpeed = currentData.wind_speed
    var uvi = currentData.uvi;
    var humidity = currentData.humidity;  

    //°F
    document.getElementById('temp-value').textContent = temp
    document.getElementById('wind-value').textContent = windSpeed
    document.getElementById('uv-value').textContent = uvi
    document.getElementById('humid-value').textContent = humidity  

}
var forecastList = document.getElementById('forecast-days')
//forecastList.innerHTML ='';

//creates and displays the blocks for 5 day forecast
var displayForecast = (weatherData) => {

    var dailyWeather = weatherData.daily[0];
    
    //make the forecast div show up
    document.getElementById('forecast').style.display= 'block';

    var temp = dailyWeather.temp.day;
    var windSpeed = dailyWeather.wind_speed;
    var uvi = dailyWeather.uvi;
    var humidity = dailyWeather.humidity;  

    document.getElementById('temp-forecast').textContent = temp;
    document.getElementById('wind-forecast').textContent = windSpeed;
    document.getElementById('uv-forecast').textContent = uvi;
    document.getElementById('humid-forecast').textContent = humidity;

    

    
}

//create divs dynamically?
//document.createElement('div')
// i+8 3pm each day


searchButton.addEventListener('click', getLocation);
