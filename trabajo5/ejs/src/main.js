const express = require('express');
const ProductosApi = require('../api/productos.js');
const productosApi = new ProductosApi()

let conProductos = false

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))



app.set('views', './views')
app.set('view engine', 'ejs');


app.post('/productos', (req, res) => {
    productosApi.save(req.body);
    res.redirect('/');
})

app.get('/productos', (req, res) => {
    const productos = productosApi.listAll()
    conProductos = productos.length > 0 ? true : false;
    res.render('vista', {productos, conProductos});
});


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));