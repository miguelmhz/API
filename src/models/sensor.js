const mongoose = require ('mongoose')
//const slugify = require ('slugify')

//Definir el schema
let sensorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        //enum: ['Miguel', 'Angel']
        //minlength, maxlength, match (expresiones regulares)
    },
    lat: {
        type:Number,
        maxlength: [50, '']
    },
    lon: Number
})
sensorSchema.virtual('info')
.get(function(){
    return '${this.name} , ${this.lat} , ${this.lon} ';
})
/*

{'Time': '2020-08-17T01:00:00',
  'NO2': 3.8,
  'O3': 8.8,
  'PM2.5': 3.0,
  'TEMP': 27.49,
  'RH': 40.0,
  'DP': 12.7}

*/

// Definir el modelo
const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports= Sensor; 
