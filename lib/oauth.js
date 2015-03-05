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
}
