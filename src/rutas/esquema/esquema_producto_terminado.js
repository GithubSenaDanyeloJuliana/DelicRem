const mongoose = require('mongoose');

const productoTerminadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ProductoTerminado', productoTerminadoSchema);
