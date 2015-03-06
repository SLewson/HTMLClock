var client_id;
var response_type;
var application_state;
var callback;

function init(json) {
  console.log('OATH - init');
  client_id = json["client_id"];
  response_type = json["response_type"];
  application_state = json["application_state"];
  callback = json["callback"];
}

function login() {
  console.log('OAUTH - login');
  var api_imgur_login = "https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type="  + response_type + "&state=" + application_state;
  console.log('OATH - ' + api_imgur_login);
  var myWindow = window.open(api_imgur_login);
}

function doTheThing() {
  console.log("do the thing");
  var username = getCookie("account_username");
  console.log("doTheThing: " + username);
  callback();
  imgurAccountPopUp();
}

function imgurAccountPopUp() {
  var endpoint = "https://api.imgur.com/3/account/" + getCookie("account_username");


  $.ajax({
     url: "https://api.forecast.io/forecast/8ad90d9fcfa20ccc903621b1ebf32747/35.300399,-120.662362?callback=?", // The URL for the request
     type: "GET", // Whether this is a POST or GET request
     dataType : "json", // The type of data we expect back
     crossDomain : true,
     // request succeeds; the response is passed to the function
     beforeSend: function (xhr) {
          /////   Authorization header////////
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      },
     success: function( json ) {
         console.log("url: " + json["data"]["url"]);
     }
  });
}
