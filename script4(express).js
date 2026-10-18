const express = require("express")
const app = express();
app.set("view engine","ejs");
app.use(function (req, res, next) {
    console.log("server start ho gya hai");
    next();
})
app.use(express.static('./public'))
app.get("/", function (req, res) {
    res.send("Hey my name is Tanish and Achin and Deb are my best friends");
});
app.get("/about", function (req, res) {
    res.send("This is about page")
})
app.get("/about/:username", function (req, res) {
    res.send(`my name is ${req.params.username}`)
})
app.get("/home",function(req,res)
{
    res.render("home")
})
app.get("/lol",function(req,res)
{
    res.render("lol",{Tanish:28})
    // This proves that ejs file is not an html file rather we can say it is coppy of html file with some extra features
})



app.listen(3000);
