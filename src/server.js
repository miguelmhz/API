const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Schema
require ('./models/sensor')

//Conexión a la base de datos
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/prueba-mongoose", ()=>{
    console.log("Me conecte a la base")
} );




//Motor de plantillas 
app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')


app.use(express.static(__dirname + "/public"))
//Rutas de la API
app.use('/api', require('./routes/'));
app.use('/sensores', require('./routes/sensores'));

app.use ((req, res, next)=>{
    res.status(404).render("404")
});

app.listen(process.env.PORT || 9080, ()=> console.log("server started")); 

