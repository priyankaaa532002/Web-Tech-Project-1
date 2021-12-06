var express = require('express');

var app = express();
app.use(express.static("public"));
app.use(express.static("images"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/snacks.html", function (req, res) {
    res.sendFile(__dirname + "/snacks.html");
});

app.get("/main_course.html", function (req, res) {
    res.sendFile(__dirname + "/main_course.html");
});

app.get("/dessert.html", function (req, res) {
    res.sendFile(__dirname + "/dessert.html");
});


app.get("/login2.html", function (req, res) {
    res.sendFile(__dirname + "/login2.html");
});

var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at %s:%s Port", host, port)
});