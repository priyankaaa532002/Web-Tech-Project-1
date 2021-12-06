var express = require('express');

var app = express();
app.use(express.static("public"));
app.use(express.static("images"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at %s:%s Port", host, port)
});