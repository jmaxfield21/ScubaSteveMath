var getlevelscompleted = function(username){
	
	var response = $.post("/levelscompleted",{"username":username}, function(){});
	
	if(!(response.responseJSON.l1 && response.responseJSON.l2 && response.responseJSON.l3)){
		$("#frattuso").prop('hidden', true);
	}
	
	if(!response.responseJSON.l4){
		$("#barracuda").prop('hidden', true);
	}
	
	console.log(response.responseJSON.l1);
	console.log(response.responseJSON.l2);
	console.log(response.responseJSON.l3);
	console.log(response.responseJSON.l4);
	console.log(response.responseJSON.l5);
}

function getCookie(cname)
{
	cname = "PLAY_SESSION";
	var name = cname + "=";
	var ca = document.cookie.split(';');

	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0){
	  	return c.substring(name.length,c.length);
		}
	  }
	return "";
}

function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}

console.log(getCookies());