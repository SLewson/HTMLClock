function redirect_init(hash) {
  setCookie("account_username", getUrlParam("account_username"));
  setCookie("token_type", getUrlParam("token_type"));
  setCookie("access_token", getUrlParam("access_token"));

  window.opener.successfulLogin();
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
