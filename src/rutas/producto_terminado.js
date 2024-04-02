const express = require('express');
const ProductoTerminado = require('./esquema/esquema_producto_terminado');

const rutas = express.Router();

// crear un producto terminado
rutas.post('/productos-terminados', async (req, res) => {
  try {
    const { nombre, cantidad, precioUnitario } = req.body;

    const productoTerminado = new ProductoTerminado({
      nombre,
      cantidad,
      precioUnitario
    });

    await productoTerminado.save();

    res.status(201).json(productoTerminado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// obtener todos los productos terminados
rutas.get('/productos-terminados', async (req, res) => {
  try {
    const productosTerminados = await ProductoTerminado.find();
    res.json(productosTerminados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// obtener un producto terminado por su id
rutas.get('/productos-terminados/:id', async (req, res) => {
  try {
    const productoTerminado = await ProductoTerminado.findById(req.params.id);
    if (!productoTerminado) {
      return res.status(404).json({ message: 'Producto terminado no encontrado' });
    }
    res.json(productoTerminado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// actu un producto terminado
rutas.put('/productos-terminados/:id', async (req, res) => {
  try {
    const { nombre, cantidad, precioUnitario } = req.body;

    const productoTerminado = await ProductoTerminado.findByIdAndUpdate(req.params.id, {
      nombre,
      cantidad,
      precioUnitario
    }, { new: true });

    if (!productoTerminado) {
      return res.status(404).json({ message: 'Producto terminado no encontrado' });
    }

    res.json(productoTerminado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// elimi un producto terminado
rutas.delete('/productos-terminados/:id', async (req, res) => {
  try {
    const productoTerminado = await ProductoTerminado.findByIdAndDelete(req.params.id);
    if (!productoTerminado) {
      return res.status(404).json({ message: 'Producto terminado no encontrado' });
    }
    res.json({ message: 'Producto terminado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
