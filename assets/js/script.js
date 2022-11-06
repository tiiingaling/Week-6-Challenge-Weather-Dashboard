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
            displayForecast(data.lon, data.lat)

            console.log('here is data')
            console.log(data)

            displayCurrent(data);
            //displayForecast(data);
        })
}


//temperature
//wind speed
//uvi
//humidity
//weather icon



// fetches the individual values for weather metris
var displayCurrent = (weatherData) => {

    var temp = weatherData.current.temp;
    var windSpeed = weatherData.current.wind_speed
    var uvi = weatherData.current.uvi;
    var humidity = weatherData.current.humidity;  

    //°F
    document.getElementById('temp-value').textContent = temp
    document.getElementById('wind-value').textContent = windSpeed
    document.getElementById('uv-value').textContent = uvi
    document.getElementById('humid-value').textContent = humidity  

}
var forecastList = document.getElementById('forecast-days')
forecastList.innerHTML ='';

//creates blocks for 5 day forecast
var displayForecast = (lat, lon) => {
    
    document.createElement

    
}
// i+8 3pm each day


searchButton.addEventListener('click', getLocation);
