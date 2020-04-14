
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
    var currentTime = moment().format('L');
    console.log(currentTime);
    var timeDisplay = $("<h4>").text("(" + currentTime + ")");
    $(".city-info").append(timeDisplay);

    var apiKey = "4a8970f1ceb21011e299d68d17d14399";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + apiKey;
    
    
    // Creating an AJAX call for the city weather info
     $.ajax({
        url: queryURL,
        method: "GET"
     }).then(function(response) {
        //console.log(response);

        var infoBox = $("<div>");

        var temp = response.main.temp;
        var tempDisplay = $("<p>").text("Temperature: " + temp + " °F");
        infoBox.append(tempDisplay);

        var humidity = response.main.humidity;
        var humidDisplay = $("<p>").text("Humidity: " + humidity + " %");
        infoBox.append(humidDisplay);

        var windspeed = response.wind.speed;
        var windspeedDisplay = $("<p>").text("Wind Speed: " + windspeed + " MPH");
        infoBox.append(windspeedDisplay);

        // Creating an AJAX call for the city UV Index info
        lat = response.coord.lat;
        lon = response.coord.lon;

        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
        url: uvIndexURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);

        var uvIndex = response.value;
        var uvIndexDisplay = $("<p>").attr("class", "uv-index").text("UV Index: " + uvIndex);
        if (uvIndex < 2) {
            uvIndexDisplay.css("background-color", "green");
        }else if (uvIndex > 7) {
            uvIndexDisplay.css("background-color", "red");
        }else {
            uvIndexDisplay.css("background-color", "orange");
        }
        infoBox.append(uvIndexDisplay);

        
        });

        $(".city-info").append(infoBox);

     

     var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

     $.ajax({
        url: fiveDayURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);

        var dailyWeatherArr = response.daily.slice(1,7);

        dailyWeatherArr.map((forecast)=>{
            var card = $("<div>").attr("class", "card");
            
            var dailyForecastDate = forecast.dt;
            var dateStamp = moment.unix(dailyForecastDate).format("L"); 
            console.log(dateStamp);

            var cardBody = $("<div>").attr("class", "card-body");
            cardBody.append(dateStamp);
            card.append(cardBody);
            $(".five-day").append(card);

            /* <div class="card">
                        <div class="card-body">
                            This is some text within a card body.
                        </div>
                    </div> */

        })



        


        })
     
     
    })
        .catch( err=>console.log(err))




    //userCity.push(cityList);
        
});
