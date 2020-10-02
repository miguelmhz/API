const {Router} = require ('express');
const router = Router();

const Sensor = require('../models/sensor')

router.get('/', async (req, res)=> {
    try {
        const sensorArray = await Sensor.find()
        res.render("sensores",{
            sensorArray: sensorArray
        })
    } catch (error) {
        
    }
})

router.get('/agregar', (req, res)=>{
    res.render ('crear')
} )



router.post("/", async(req, res)=>{
    const body= req.body;
    console.log(body);
    try {
        const sensorDB= new Sensor(body);
        await sensorDB.save()
        res.redirect('/sensores')
    } catch (error) {
        console.log(error)
    }
})

router.get ('/:id', async (req, res)=>{
    const id= req.params.id;
    try {
        const sensorDB = await Sensor.findById(req.params.id);
        console.log(sensorDB.name)
        res.render('detalle', {
            sensor: sensorDB,
           error : false
            
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error : true,
            mensaje: "El ID no existe"
         })
    }
});

router.delete ('/:id', async (req, res)=>{
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



module.exports= router;

