var sendDemNamesAndScores = function(id, name){
	var score = $($("td[name='score']")[2]).text();
	var page = $.post("/getcertificate",{"name":name, "score":score}, function(){});
	$("#certificateDiv").load("https://www.google.com");
}

var bindToButtons = function(event){
	$([".certButton"]).bind('click', sendDemNamesAndScores);
};

$(window).load(bindToButtons);

