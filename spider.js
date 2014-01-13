var http = require('http');
var querystring = require('querystring');

var spider = {};

spider.get = function(url, callback){
	http.get(url, function(res) {
		var size = 0;
	    var chunks = [];
	    res.on('data', function(chunk){
	        size += chunk.length;
	        chunks.push(chunk);
	    });
	    res.on('end', function(){
	        var data = Buffer.concat(chunks, size);
	        //console.log(data.toString())
	        callback && callback(null, data.toString());
	    });
	}).on('error', function(e) {
	    //console.log("Got error: " + e.message);
	    callback && callback(e, null)
	});
};

exports.get = spider.get;