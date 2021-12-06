var express = require('express');
const bodyParser = require("body-Parser");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
var app = express();
app.use(express.static("public"));
app.use(express.static("images"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/register", function (req, res) {
    var name = req.body.name
    var password = req.body.password
    var phone = req.body.phone
    var email = req.body.email
    var address = req.body.address
    var pincode = req.body.pincode


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Connected to Database");
        var dbo = db.db("fooddb");
        var r = {
            name,
            password,
            phone,
            email,
            address,
            pincode
        }
        dbo.collection('User').insertOne(r, function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close()
        });
    });

    res.sendFile(__dirname + "/index.html");
});

app.post("/login", function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected to Database");
        var dbo = db.db("fooddb");
        var find = {name: req.body.name}

        dbo.collection("User").find(find).toArray(function(err, result) {
            if (err) throw err;
            if(result.length == 0) {
                console.log("You are not an existing user")
            } else {
                if(result[0].password != req.body.password) {
                    console.log("Wrong Password")
                } else{
                    res.sendFile(__dirname + "/index.html");
                }
            }
            console.log(result);
            db.close();
          });
    })
})
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