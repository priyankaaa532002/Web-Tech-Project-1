const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.use(express.static("images"));

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/fooddb", { useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    name: String,
    password: String, 
    phone: Number,
    email: String, 
    address: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    const newUser = new User({
        name: req.body.username,
        password: req.body.password,

    });
    newUser.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
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