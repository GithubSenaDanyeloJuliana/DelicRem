const express = require('express');
const ComprobanteVenta = require('./esquema/esquema_comprobante_venta');
const OrdenProduccion = require('./esquema/esquema_orden_produccion');

const rutas = express.Router();

// crear un nuevo comprobante 
rutas.post('/comprobantes-venta', async (req, res) => {
  try {
    // obtener el número de orden de pedido 
    const { numeroOrdenPedido, nombreProducto, cantidad, valorAPagar } = req.body;

    // buscar la orden de producción correspondiente
    const ordenProduccion = await OrdenProduccion.findOne({ numeroOrdenPedido });
    if (!ordenProduccion) {
      return res.status(404).json({ message: 'Orden de producción no encontrada' });
    }

    // crear un nuevo comprobante de venta
    const nuevoComprobanteVenta = new ComprobanteVenta({
      numeroOrdenPedido,
      ordenProduccion: ordenProduccion._id, // Asignar la referencia a la orden de producción
      nombreProducto,
      cantidad,
      valorAPagar
    });

    // guardar el nuevo comprobante de venta en la base de datos
    const comprobanteGuardado = await nuevoComprobanteVenta.save();

    // devolver el comprobante de venta creado como respuesta
    res.status(201).json(comprobanteGuardado);
  } catch (error) {
    // Manejar los errores
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
