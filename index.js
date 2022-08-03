const fs = require("fs");

async function readFile(filename) {
    try {
        const contenido = await fs.promises.readFile(filename, 'utf-8')
        return JSON.parse(contenido);
    } catch (error) {
        console.log('Hubo un error al leer el archivo: ' + filename);
    }
}

async function writeFile(filename, contenido) {
    try {
        await fs.promises.writeFile(filename, JSON.stringify(contenido, null, 2));
    } catch (error) {
        console.log('Hubo un error al escribir el archivo: ' + filename);
    }
}

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }
    async save({
        title,
        price,
        thumbnail
    }) {
        // obtener todos los productos del archivo
        const productos = await this.getAll();
        const producto = {
            id: productos.length + 1,
            title,
            price,
            thumbnail
        }
        const newProductos = [...productos, producto];
        writeFile(this.filename, newProductos);
    }
    async getById(id) {
        const productos = await readFile(this.filename);
        return productos.find(prod => prod.id === id);
    }
    async getAll() {
        const productos = await readFile(this.filename);
        return productos;
    }
    async deleteById(id) {
        const productos = await this.getAll();
        await writeFile(this.filename, productos.filter(prod => prod.id !== id))
    }
    async deleteAll() {
        await writeFile(this.filename, [])
    }
}

async function main() {
    const c = new Contenedor('./productos.txt');
    c.deleteAll();
    // Agregar un producto al archivo
    await c.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    });
    await c.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    })
    await c.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    })
    console.log('TODOS LOS PRODUCTOS')
    console.log(await c.getAll());
    console.log('PRODUCTO CON ID 3')
    console.log(await c.getById(3));
    setTimeout(() => c.deleteById(2), 2000);
}

main()
