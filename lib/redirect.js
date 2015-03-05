function redirect_init(hash) {
  console.log("redirect_init");
  setcookie("account_username", getUrlParam("account_username"));
  setcookie("token_type", getUrlParam("token_type"));
  setcookie("access_token", getUrlParam("access_token"));
  console.log("set cookies");
  doTheThing();
}

function getUrlParam( param ){
	param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var exp = "[\\?&]"+param+"=([^&#]*)";
	var regexp = new RegExp( exp );
	var results = regexp.exec( window.location.href );
	if( results == null ){
		return "";
	} else {
		return results[1];
	}
}
