function redirect_init(hash) {
  console.log("redirect_init");
  console.log(getUrlParam("account_username"));
  console.log(getUrlParam("token_type"));
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
