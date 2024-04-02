const mongoose = require('mongoose');

const ordenProduccionSchema = mongoose.Schema({
    numeroOrdenPedido: {
        type: String,
        required: true
    },
    nombreCliente: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    producto: {
        type: String, // Puedes cambiar a ObjectId si el producto tiene su propio esquema
        required: true
    },
    cantidadRequerida: {
        type: Number,
        required: true
    },
    valorAPagar: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('OrdenProduccion', ordenProduccionSchema);
