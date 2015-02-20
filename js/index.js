var myAlarms;
var userId;

function setupFacebook() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1395985730713299',
      xfbml      : true,
      version    : 'v2.2'
    });
    FB.getLoginStatus(function(response) {
      console.log("getLoginStatus")
      if (response.status === 'connected') {
        console.log('Logged in.');
        getUserName()
        getAllAlarms()
      }
      else {
        FB.login();
      }
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

function getUserName() {
  console.log("get username")
  FB.api('/me', function(response) {
    console.log("Name: "+ response.name + "\nFirst name: "+ response.first_name + "ID: "+response.id);
    userId = response.id;
    var img_link = "http://graph.facebook.com/"+response.id+"/picture";
  });
}

function showAlarmPopup() {
  $("#mask").removeClass("hide");
  $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
  $("#mask").addClass("hide");
  $("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName, parseid) {
  console.log("Got id: " + parseid);
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

  var delButton = $("<input>");
  delButton.attr("type", "button");
  delButton.attr("value","Delete");
  delButton.attr("class", "button");
  delButton.attr("greeting", "yo");
  delButton.attr("parseid", parseid);
  delButton.click(function() { deleteAlarm($(this))});
  //delButton.attr("onclick", "javascript:deleteAlarm(this);")
  mdiv.append(delButton);

  $("#alarms").append(mdiv);
}

function addAlarm() {
  var hours = $("#hours option:selected").text();
  var mins = $("#mins option:selected").text();
  var ampm = $("#ampm option:selected").text();
  var alarmName = $("#alarmName").val();

  var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName, "userid", userId}, {
      success: function(object) {

        insertAlarm(hours, mins, ampm, alarmName, object.id);
        hideAlarmPopup();
        myAlarms.add(alarmObject);
      }
    });
}

function deleteAlarm(alarm) {
  var query = new Parse.Query("Alarm");
  query.equalTo("objectId", alarm.attr("parseid"));
  query.find({
    success: function(alarms) {
      for (var i = 0; i < alarms.length; i++) {
          alarms[i].destroy({
          success: function(alarmToDelete) {
            alarm.parent().remove();
          },
          error: function(alarmToDelete, error) {
            console.log("Parse delete error")
          }
        });
      }
    }
  });
}

function getAllAlarms() {
  Parse.initialize("NVAaIXJYQhMvAWUdwqtOhICNXPzNhx265Ke8dYME", "wscbaeetwwXMFgIo9CoYstdB2JNNShA9RVCis3Xd");
  var AlarmObject = Parse.Object.extend("Alarm");
  var query = new Parse.Query(AlarmObject);
  query.equalTo("userId", userId);
   query.find({
       success: function(results) {
         myAlarms = results;
         for (var i = 0; i < results.length; i++) {
           console.log("id? " + results[i].get("id"));
           console.log("hours? " + results[i].get("hours"));
           insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"), results[i].id);
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
  setupFacebook()
  getTime()
  getTemp()
});
