var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname +  '/angular-frontend/app/'));

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)


var clients = [ ];

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  	var id = clients.push(ws);
  	console.log(id)
	  // console.log("websocket connection open")

	 ws.on("message", function(data) {
	 	console.log(data);
		for (var i = 0, len = clients.length; i < len; i++) {
			try
      			{
                clients[i].send(data);
            	}
            	catch(e)
			      {
			          console.log("completeConnection error", e);
			          // Additional cleanup required?
			      }
		}
	 });

	ws.on("close", function() {
	  clients.splice(id, 1);
	  console.log("websocket connection close")
	})
})



wss.on("data", function(client, str) {
  var obj = JSON.parse(str);

  if("id" in obj) {
    // New client, add it to the id/client object
    clients[obj.id] = client;
  } else {
    // Send data to the client requested
    clients[obj.to].send(obj.data);
  }
});



