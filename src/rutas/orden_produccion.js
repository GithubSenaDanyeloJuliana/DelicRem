const express = require('express');
const esquema_orden_produccion = require('./esquema/esquema_orden_produccion');

const rutas = express.Router();

// crear orden de producción
rutas.post('/ordenes-produccion', async (req, res) => {
  try {
    const { nombreCliente, telefono, cedula, numeroOrdenPedido, producto, cantidadRequerida, valorAPagar } = req.body;


    // crear orden de producción
    const ordenProduccion = new esquema_orden_produccion({ 
      nombreCliente, 
      telefono, 
      cedula, 
      numeroOrdenPedido, 
      producto, 
      cantidadRequerida, 
      valorAPagar 
    });
    await ordenProduccion.save();

    res.status(201).json(ordenProduccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// obtener todas las ordenes de produccion
rutas.get('/ordenes-produccion', async (req, res) => {
  try {
    const ordenesProduccion = await esquema_orden_produccion.find();
    res.json(ordenesProduccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// obtener una orden de produccion por su id
rutas.get('/ordenes-produccion/:id', async (req, res) => {
  try {
    const ordenProduccion = await esquema_orden_produccion.findById(req.params.id);
    if (!ordenProduccion) {
      return res.status(404).json({ message: 'Orden de producción no encontrada' });
    }
    res.json(ordenProduccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// actualizar una orden de produccion por id
rutas.put('/ordenes-produccion/:id', async (req, res) => {
  const { id } = req.params;
  const { nombreCliente, telefono, cedula, numeroOrdenPedido, producto, cantidad, valorAPagar } = req.body;

  const datosActualizados = {
    nombreCliente,
    telefono,
    cedula,
    numeroOrdenPedido,
    producto,
    cantidad,
    valorAPagar
  };

  try {
    const ordenActualizada = await esquema_orden_produccion.findByIdAndUpdate(id, datosActualizados, { new: true });

    if (!ordenActualizada) {
      return res.status(404).json({ message: 'Orden de producción no encontrada' });
    }

    res.json(ordenActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// eliminar orden de producción por id
rutas.delete('/ordenes-produccion/:id', async (req, res) => {
  try {
    const ordenProduccion = await esquema_orden_produccion.findByIdAndDelete(req.params.id);
    if (!ordenProduccion) {
      return res.status(404).json({ message: 'Orden de producción no encontrada' });
    }
    res.json({ message: 'Orden de producción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
