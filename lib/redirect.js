function redirect_init(hash) {
  console.log("redirect_init");
  console.log(getUrlParam("account_username"));
  console.log(getUrlParam("token_type"));
}

# borrowed from: http://blog.initlabs.com/post/16849127355/how-to-get-url-parameter-or-hash-fragment-using
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
