require('dotenv').config()
const express = require('express');
// we could have also written 
// import express from "express"
const app = express() // made a variable through which we can 
// use things present in express
const port = process.env.PORT // this is fro where the serever listen the 
// request 

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/tanish', (req, res) => { // remeber to put / 
  res.send('Hello tanish!')
})
//a type of request, here req and res are request and response


app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
  console.log(`Example app listening on port ${port}`)
}) // this is to tell if our server is successefully listning
// or not

// NOTE:-
// if we make changes in code of backend and if at that time
// our server is litning then it will not be able to figure out 
// changes hence we need to rstart the server 

// now that we are done with work of application we need to
// deploy it so when the app runs on some another device 
// some variables may needed to be changed like port number 
// for this we need to make .env file and save our variable values there
// so that user can change varables just by going into one file i.e env file 
// 1) download npm i dotevn
// 2) make file .env (in general we write all variable names in caps in this file)
// now to use it first include it by writing require('dotenv').config()
// now to use variable write process.config.vaiable name
// now we need to deploy it (Digital ocean)