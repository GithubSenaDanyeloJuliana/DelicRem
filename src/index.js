const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rutasInsumos = require('./rutas/insumo');
const rutasproductoTerminado = require('./rutas/producto_terminado');
const rutasordenProduccion = require('./rutas/orden_produccion');


dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', rutasInsumos);
app.use('/api', rutasproductoTerminado);
app.use('/api', rutasordenProduccion);


// conexión a mongo
mongoose.connect(process.env.MONGODB_CENEXION, {

}).then(() => console.log('Conexión a Mongo exitosa'))
  .catch((error) => console.error('Error de conexión a Mongo:', error.message));

// inicio servidor
app.listen(port, () => console.log('Servidor escuchando por el puerto:', port));
