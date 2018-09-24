let http = require("http");

http.createServer(function(req, res) {
    let request = req;
    console.log("REQUEST: ", req);
    let allHeaders = req.headers;
    console.log(allHeaders);
	let userAgent = req.headers['user-agent'];
	let userArr = userAgent.split(" ");
	let user = userArr.splice(1, 3).join(" ").replace(/;|\(|\)/g, "");
	let ip = req.headers["x-forwarded-for"];
	let lang = req.headers["accept-language"];
		
		res.statusCode = 200;
	    res.writeHead(200, {'Content-Type': 'application/json', "user-agent": ""})

		var resBody = {
		  userAgent: user,
		  ip: ip,
		  language: lang
		};
		    
		res.write(JSON.stringify(resBody));
		res.end();
		
}).listen(process.env.PORT, process.env.IP, function(){
	console.log("getheader server connected");
});


//Note to self:
// I wanted a solution using Node js without Express. Found invaluable help from the following resourse:
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

/*var http = require('http');

http.createServer(function(request, response) {
 // var headers = request.headers;
  var userAgent = request.headers["user-agent"];
  var userArr = userAgent.split(" ");
  var user = userArr.splice(1, 3).join(" ").replace(/;|\(|\)/g, "")
  var ip = request.headers["x-forwarded-for"];
  var lang = request.headers["accept-language"];
//  var method = request.method;
//  var url = request.url;
//  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
  //  body.push(chunk);
  }).on('end', function() {
//	console.log(body);
   /// body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    var responseBody = {
      userAgent: user,
      ip: ip,
      language: lang,
     // body: body
    };
    
    response.write(JSON.stringify(responseBody));
    response.end();
  });
}).listen(8080, function(){
	console.log("Server connected and listening...");
});*/