const {Router} = require ('express');
const { modelNames } = require('mongoose');
const mongoose = require('mongoose');
const { parse } = require('json2csv');
 
const fields = ['_id', 'name', 'lat', 'lon'];
const opts = { fields };

const router = Router();
const Sensor = require('../models/sensor')



router.get("/",(req,res)=>{
    res.render("index", {titulo: "Bienvenido al API"});
});


//Obtener todos los datos 
router.get("/json", (req, res)=>{
    Sensor.find({})
    .then(doc => {
        res.json(doc);
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})

router.get("/csv", (req, res)=>{
    Sensor.find({})
    .then(doc => {
        res.send(parse(doc, opts))
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})
// seleccionar por id
router.get("/json/:id", (req, res)=>{
    Sensor.findById(req.params.id)
    .then(doc => {
        res.json(doc);
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})

router.get("/csv/:id", (req, res)=>{
    Sensor.findById(req.params.id)
    .then(doc => {
        res.send(parse(doc, opts))
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})

//actualizar
router.put("/put/:id", (req, res)=>{
    const body= req.body;
    console.log(body.lat)
    Sensor.findByIdAndUpdate(req.params.id, {name: body.name, lat:body.lat, lon:body.lon},{multi:true})
    .then (doc => {
        res.json(doc);
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})


//seleccionar que contenga 
router.get("/json/regex/:word", (req, res)=>{
    const word = req.params.word;
   
    Sensor.find({
        name:{
            $regex:word,
            $options: "i" //no sensible a mayusculas 
        }
    })
    .then (collection => {
        res.json(collection);
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})

router.get("/csv/regex/:word", (req, res)=>{
    const word = req.params.word;
   
    Sensor.find({
        name:{
            $regex:word,
            $options: "i" //no sensible a mayusculas 
        }
    })
    .then (collection => {
        res.send(parse(collection, opts))
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})

/*
router.post('/post', (req, res)=>{
  
    Sensor.create({
        name: "sensor3",
        lon: 698123,
        lat: 123456
    }).then(doc => {
        res.json(doc);
    }).catch(err=>{
        console.log(err);
        res.json(err)
    })
})*/
router.post("/post", async(req, res)=>{
    const body= req.body;
    console.log(body);
    try {
        const sensorDB= new Sensor(body);
        await sensorDB.save()
        res.json(sensorDB);
    } catch (error) {
        console.log(error)
    }
})

router.delete ('/delete/:id', async (req, res)=>{
    try {
        const sensorDB = await Sensor.findByIdAndDelete(req.params.id)
        if (sensorDB) {
            res.json({
                estado:true,
                mensaje:"Eliminado"
            })
        } else {
            res.json({
                estado:false,
                mensaje:"No eliminado"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
