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
            console.log('Weather Data', data)

            displayCurrent(data);
            displayForecast(data);
        })
}

// fetches the individual values for weather metris
var displayCurrent = (weatherData) => {

    var currentData = weatherData.current

    var temp = currentData.temp;
    var windSpeed = currentData.wind_speed
    var uvi = currentData.uvi;
    var humidity = currentData.humidity;

    var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
    var iconCode = currentData.weather[0].icon;
    
    //write icon as img into html?

    
    document.getElementById('temp-value').textContent = temp
    document.getElementById('wind-value').textContent = windSpeed
    document.getElementById('uv-value').textContent = uvi
    document.getElementById('humid-value').textContent = humidity  

}
//creates and displays the blocks for 5 day forecast
var displayForecast = (weatherData) => {
  
    //make the forecast div show up
    document.getElementById('forecast').style.display= 'block';

    //clears html for next search
    var list = document.getElementById('forecast-days')
    list.innerHTML = '';

//creates multiple blocks to display forecast
    for (let i = 0; i < 5; i++) {
        var dailyWeather = weatherData.daily[i];
    
        //date conversion from UNIX
        var UNIX = (dailyWeather.dt * 1000)        
        var options = {weekday: 'long', month: 'long', day: 'numeric'}

        var datestamp = new Date(UNIX).toLocaleDateString("en-gb", options)
        var temp = dailyWeather.temp.day + ' °F';
        var windSpeed = dailyWeather.wind_speed + ' mph';
        var humidity = dailyWeather.humidity + ' %';
        var uvi = dailyWeather.uvi;

            var newDay = document.createElement('div');
            newDay.classList.add('day');
            newDay.innerHTML =   
            `<div class="info">
                <div class="date">
                    <span id="date" class="bold">${datestamp}</span>
                </div>

                <div class="temperature">
                    <span>Temp:</span>
                    <span id="temp-forecast">${temp}</span>
                </div>

                <div class="wind">
                    <span>Wind Speed:</span>
                    <span id="wind-forecast">${windSpeed}</span>
                </div>

                <div class="humidity">
                    <span>Humidity:</span>
                    <span id="humid-forecast">${humidity}</span>
                </div>

                <div class="uv-index">
                    <span>UV Index:</span>
                    <span id="uv-forecast">${uvi}</span>
                </div>
            </div>`;
    
        list.appendChild(newDay);
        }
  }

searchButton.addEventListener('click', getLocation);
