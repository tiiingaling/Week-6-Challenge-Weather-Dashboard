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



var displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = (weatherData.name), (weatherData.country)

    //getWeather(weatherData.lat, weatherData.lon)
    console.log(weatherData)
};


//var getWeather = (lat, lon) => {

    //var apiUrl = `${WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
    //fetch(apiUrl)
        //.then(response => response.json())
        //.then(data => {
            //displayCurrent(data)
            //displayForecast(data)
            //write functions for current and 5 day forecast
        //})
//}

var displayCurrent = (weatherData) => {
    var current = weatherData.current;


}

searchButton.addEventListener('click', getLocation);

