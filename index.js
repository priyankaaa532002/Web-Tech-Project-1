var express = require('express');
const bodyParser = require("body-Parser");
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
var app = express();
app.use(express.static("public"));
app.use(express.static("images"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/register.html");
});


var alert = require("alert");
function myFunction() {
    alert("Hello! I am an alert box!");
}

var userName = ""
var userPassword = ""

app.post("/addtocart",(req,res)=>{
    const body= req.body;
    console.log(body);

    MongoClient.connect(url, function(err, db) {
        if(err) throw err;

        var dbo = db.db("fooddb")
        dbo.collection("Cart").insertOne({userName, userPassword, body}, function(err, res) {
            console.log("Item added to cart")
            db.close()
        })
    })
})

app.post("/register", function (req, res) {
    var name = req.body.name
    var password = req.body.password
    userName = name
    userPassword = password
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
                res.send("Not a user")
            } else {
                if(result[0].password != req.body.password) {
                    console.log("Wrong Password")
                
                } else{
                    userName = result[0].name
                    userPassword = result[0].password
                    console.log(result);
                    res.sendFile(__dirname + "/index.html");
                }
            }
            db.close();
        });
    })
})

app.get("/snacks.html", function (req, res) {
    res.sendFile(__dirname + "/snacks.html");
    console.log(userName + " " + userPassword)
});

app.get("/main_course.html", function (req, res) {
    res.sendFile(__dirname + "/main_course.html");
});

app.get("/dessert.html", function (req, res) {
    res.sendFile(__dirname + "/dessert.html");
});

app.get("/login.html", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get("/cart", function (req, res) {

    var items = []
    var total = 0
    var html = ''
    html += '<body>'
    html += 'Hello'
    html += '<ul>'
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        var dbo = db.db("fooddb")

        dbo.collection("Cart").find().toArray(function(err,result) {

            for(i=0; i<result.length; i++) {
                if(userName == result[i].userName){
                    items.push(result[i])
                    total += result[i].body.price
                    html += '<li>' + result[i].body.name + " " + result[i].body.price +'</li>'
                    console.log(result[i].body.name + " " + result[i].body.price)
                }
            }
            console.log(total)
            html += '</ul>'
            html += "Total: " + total
            html += '</body>'
            // res.sendFile(__dirname + "cart.html")
            res.send(html)
            db.close()
        })
    })

    
    // res.sendFile(__dirname + "/cart.html")
})

var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at %s:%s Port", host, port)
});