var sendDemNamesAndScores = function(id, name){
	var self = this;
	var res = undefined;
	var score = $($("td[name='score']")[id]).text();
	var page = $.post("/getcertificate",{"name":name, "score":score}, function(response){
		$("body").empty()
		$("body").html(response);
		res = response;
	});
	var bp = undefined;
}

var bindToButtons = function(event){
	$([".certButton"]).bind('click', sendDemNamesAndScores);
};

$(window).load(bindToButtons);

