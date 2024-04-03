const express = require('express');
const esquema_insumo = require('./esquema/esquema_insumo'); 

const rutas = express.Router();

// crear un insumo
rutas.post('/insumos', async (req, res) => {
  try {
    const insumo = new esquema_insumo(req.body); 
    await insumo.save();
    res.status(201).json(insumo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// obtener todos los insumos
rutas.get('/insumos', async (req, res) => {
  try {
    const insumos = await esquema_insumo.find(); 
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// obtener un insumo por su id
rutas.get('/insumos/:id', async (req, res) => {
  try {
    const insumo = await esquema_insumo.findById(req.params.id); 
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    res.json(insumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// actu un insumo por id
rutas.put('/insumos/:id', async (req, res) => {
  try {
    const { nombre, cantidad, unidadMedida, observaciones } = req.body;
    const insumo = await esquema_insumo.findByIdAndUpdate(req.params.id, { nombre, cantidad, unidadMedida, observaciones }, { new: true });
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    res.json(insumo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// eliminar un insumo por id
rutas.delete('/insumos/:id', async (req, res) => {
  try {
    const insumo = await esquema_insumo.findByIdAndDelete(req.params.id); 
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
