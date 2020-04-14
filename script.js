
//Where the cities searched will be stored
var cityList = [];


// When the user inputs a city name and clicks Search
// The userCity is stored in localStorage
// The displayCityInfo function re-renders the HTML to display the appropriate content according to userCity
  // The city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index is displayed in #city-Info

$("button").on("click", function(event) {
    event.preventDefault();
    var userCity = $("input").val();
    $("h2").text(userCity);
     
        var apiKey = "4a8970f1ceb21011e299d68d17d14399";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + apiKey;
    
        
        // Creating an AJAX call for the city weather info
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //console.log(response);

            var temp = response.main.temp;
            var tempDisplay = $("<p>").text("Temperature: " + temp + " °F");
            $(".city-info").append(tempDisplay);

            var humidity = response.main.humidity;
            var humidDisplay = $("<p>").text("Humidity: " + humidity + " %");
            $(".city-info").append(humidDisplay);

            var windspeed = response.wind.speed;
            var windspeedDisplay = $("<p>").text("Wind Speed: " + windspeed + " MPH");
            $(".city-info").append(windspeedDisplay);

        // Creating an AJAX call for the city UV Index info
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            /* var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        }); */

    });


    //userCity.push(cityList);
        
});
