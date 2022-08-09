const { promises: fs } = require("fs")

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }


    async save(nuevoObjeto) {
        const objetos = await this.getAll()
        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            const ultimoId = parseInt(objetos[objetos.length - 1].id)
            newId = ultimoId + 1;
        }

        objetos.push({ ...nuevoObjeto, id: newId })

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async getById(id) {
        try {
            const objetos = await this.getAll();
            const filtrarObjetos = objetos.find((elem) => elem.id === id);
            const response = filtrarObjetos === undefined ? null : filtrarObjetos;
            return response;
          } catch (error) {
            throw new Error(`Error al buscar un producto por id: ${error}`);
          }
    }
    async getAll() {
        try {
            const objetos = await fs.readFile(this.ruta, "utf-8")
            return JSON.parse(objetos)
        } catch (error) {
            return []
        }
    }
    async deleteById(id) {
        const objetos = await this.getAll();
        const nuevoDato = objetos.filter((elem) => elem.id !== id);
        if (nuevoDato.length === objetos.length) {
          throw new Error(`Error while deleting. The id: ${id} was not found.`);
        }
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
        } catch (error) {
          throw new Error(`Error while deleting.`);
        }
    }
    async deleteAll() {
        try {
            const content = [];
            await fs.writeFile(this.ruta, JSON.stringify(content, null, 2))
        } catch (error) {
            throw new Error(error);
        }
    }
}

(async function mostrarResultados(){
    const listaProductos = new Contenedor(`./productos.txt`)

	await listaProductos.save({
		title: 'Escuadra',                                                                                                                                 
        price: 123.45,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png' 
	});
	await listaProductos.save({
		title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'  
	});
    await listaProductos.save({
		title: 'Globo Terráqueo',                                                                                                                          
        price: 345.67,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'    
	});

	console.log(await listaProductos.getById(1));
	await listaProductos.getAll();
	await listaProductos.deleteById(1);
	await listaProductos.deleteAll();
})();