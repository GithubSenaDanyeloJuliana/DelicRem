const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rutasInsumos = require('./rutas/insumo');
const rutasproductoTerminado = require('./rutas/producto_terminado');
const rutasordenProduccion = require('./rutas/orden_produccion');
const rutascomprobanteVenta = require('./rutas/comprobante_venta');

dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', rutasInsumos);
app.use('/api', rutasproductoTerminado);
app.use('/api', rutasordenProduccion);
app.use('/api', rutascomprobanteVenta);

// Conexión a Mongo
mongoose.connect(process.env.MONGODB_CENEXION, {


}).then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error.message));

// Iniciamos el servidor
app.listen(port, () => console.log('Servidor escuchando por el puerto:', port));
