const express = require('express');
const contenedor = require('./../utils/contenedor');
const getRandomNumber = require('./../utils/getRandomNumber');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('server andando')
});

router.get('/productos', async function(req, res) {
    const productos = await contenedor.getAll();
    res.send(productos);
});

router.get('/productoRandom', async function(req, res) {
    const productos = await contenedor.getAll();
    const index = getRandomNumber(0, productos.length);
    const producto = productos[index];
    res.send(producto);
});

module.exports = router;