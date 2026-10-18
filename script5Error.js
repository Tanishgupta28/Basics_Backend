const express=require('express');
const app=express();
app.use(function(req,res,next)
{
 console.log("server has been started");
 next();
})
app.get("/error",function(req,res,next)
{
    throw Error("something went wrong");
})
app.use(express.static('./public'));//here i linked all the static files 
app.set("view engine","ejs");//here i linked all the ejs files
app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })
  app.listen(2000);
