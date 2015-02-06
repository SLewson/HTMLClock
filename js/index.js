function showAlarmPopup() {
  $("#mask").removeClass("hide");
  $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
  $("#mask").addClass("hide");
  $("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
  var mdiv = $("<div>");
  mdiv.addClass("flexible");

  var nameDiv = $("<div>");
  nameDiv.attr("class", "name")
  nameDiv.html(alarmName);
  mdiv.append(nameDiv);

  var timeDiv = $("<div>");
  timeDiv.attr("class", "time")
  timeDiv.html(hours + ":" + mins + ampm);
  mdiv.append(timeDiv);

  $("#alarms").append(mdiv);
}

function addAlarm() {
  var hours = $("#hours option:selected").text();
  var mins = $("#mins option:selected").text();
  var ampm = $("#ampm option:selected").text();
  var alarmName = $("#alarmName").val();


  var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(hours, mins, ampm, alarmName);
        hideAlarmPopup();
      }
    });
}

function getAllAlarms() {
  Parse.initialize("NVAaIXJYQhMvAWUdwqtOhICNXPzNhx265Ke8dYME", "wscbaeetwwXMFgIo9CoYstdB2JNNShA9RVCis3Xd");
  var AlarmObject = Parse.Object.extend("Alarm");
  var query = new Parse.Query(AlarmObject);
   query.find({
       success: function(results) {
         for (var i = 0; i < results.length; i++) {
           insertAlarm(results[i].get("time"), results[i].get("alarmName"));
         }
       }
   });
}

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
         var tempMax = json.daily.data[0].temperatureMax
         $("#forecastLabel").append(forecastText)
         $("#forecastIcon").attr("src", forecastGraphic)

         if (tempMax < 60) {
           $("body").attr("class", "cold")
         }
         else if (tempMax >= 60) {
           $("body").attr("class", "chilly")
         }
         else if (tempMax >= 70) {
           $("body").attr("class", "nice")
         }
         else if (tempMax >= 80) {
           $("body").attr("class", "warm")
         }
         else if (tempMax >= 90) {
           $("body").attr("class", "hot")
         }
     },
     // request fails; the raw request and status codes are passed to the function
     error: function( xhr, status, errorThrown ) {
         alert( "Sorry, there was a problem!" );
     }
  });
}

$(document).ready(function() {
  getTime()
  getTemp()
  getAllAlarms()
});
