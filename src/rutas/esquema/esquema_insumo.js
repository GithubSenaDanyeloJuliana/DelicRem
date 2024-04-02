const mongoose = require('mongoose');

const insumoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    unidadMedida: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Insumo', insumoSchema);
