function getTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  setTimeout(getTime, 1000);
  setTime(time);
}

function setTime(time) {
  document.getElementById("clock").innerHTML = time;
}

function getTemp() {
  $.ajax({
     url: "https://api.forecast.io/forecast/8ad90d9fcfa20ccc903621b1ebf32747/35.300399,-120.662362?callback=?", // The URL for the request
     type: "GET", // Whether this is a POST or GET request
     dataType : "json", // The type of data we expect back
     crossDomain : true,
     // request succeeds; the response is passed to the function
     success: function( json ) {
         var forecastText = json.daily.summary
         var forecastGraphic = "img/" + json.daily.icon + ".png"
         $("#forecastLabel").append(forecastText)
         $("#forecastIcon").attr("src", forecastGraphic)
         //document.getElementById("forecastLabel").src = forecastGraphic

     },
     // request fails; the raw request and status codes are passed to the function
     error: function( xhr, status, errorThrown ) {
         alert( "Sorry, there was a problem!" );
     }
  });
}

$(document).ready(function() {
  getTemp()
});
