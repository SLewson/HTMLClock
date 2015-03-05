var clientId;
var type;
var callback_function;

function init(json) {

}

function login() {
  console.log('OAUTH - login');
  var client_id = "45ecb8815bbcac6";
  var response_type = "token";
  var application_state = "login";
  var api_imgur_login = "https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type="  + response_type + "&state=" + application_state;
  console.log('OATH - ' + api_imgur_login);
  var myWindow = window.open(api_imgur_login);
}
