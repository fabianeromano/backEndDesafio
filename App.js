class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);

    }
    countMascotas() {
        return `Cantidad de mascotas: ${this.mascotas.length}`;
    }
    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    }
    getBookNames() {
        let bookNames = [];
        this.libros.forEach(libro => {
            bookNames.push(libro.nombre);
        })
        return bookNames;
    }

}

let usuario = new Usuario("Elon", "Musk");
console.log(usuario.getFullName());
usuario.addMascota("Perro");
usuario.addMascota("Gato");
console.log(usuario.countMascotas());
usuario.addBook("El señor de las moscas", "William Golding");
usuario.addBook("Fundacion", "Isaac Asimov");
console.log(usuario.getBookNames());