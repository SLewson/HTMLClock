var client_id;
var response_type;
var application_state;
var callback;

function init(json) {
  client_id = json["client_id"];
  response_type = json["response_type"];
  application_state = json["application_state"];
  callback = json["callback"];
}

function login() {
  var api_imgur_login = "https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type="  + response_type + "&state=" + application_state;
  var myWindow = window.open(api_imgur_login);
}

function doTheThing() {
  var username = getCookie("account_username");
  imgurAccountPopUp();
}

function imgurAccountPopUp() {
  var endpoint = "https://api.imgur.com/3/account/" + getCookie("account_username");

  console.log("endpoint: " + endpoint);
  console.log("Authorization: " + getCookie("access_token"));
  $.ajax({

     url: endpoint,
     type: "GET", // Whether this is a POST or GET request
     dataType : "json", // The type of data we expect back
     crossDomain : true,
     // request succeeds; the response is passed to the function
     beforeSend: function (xhr) {
          /////   Authorization header////////
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      },
     success: function( json ) {
          alert("Hello! I am an alert box!");
         console.log("url: " + json["data"]["url"]);
     },
     error: function( xhr, status, errorThrown ) {
         alert( "Sorry, there was a problem!" );
     }
  });
}
