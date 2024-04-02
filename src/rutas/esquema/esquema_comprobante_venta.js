const mongoose = require('mongoose');

const comprobanteVentaSchema = mongoose.Schema({
    numeroOrdenPedido: {
        type: String,
        required: true
    },
    ordenProduccion: {
        type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referenciar la orden de producción
        ref: 'OrdenProduccion', // Referencia al modelo de orden de producción
        required: true
    },
    nombreProducto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    valorAPagar: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ComprobanteVenta', comprobanteVentaSchema);
