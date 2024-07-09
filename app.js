const express = require("express");
const app = express();
const path = require("path");
//require http server which are buit-in with nodejs
const http = require("http");

//require socketio
const socketio = require("socket.io");
//http main method
const server = http.createServer(app);
//call socket io function
const io = socketio(server);

//setup ejs
app.set("view engine", "ejs");
//setup for static folder
app.set(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
});


app.get("/", function (req, res){
    res.render("index");
});

server.listen(3000);
