class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`);
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
        
    }
    countMascotas(){
    console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
    }
    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }
    getBookNames(){
        console.log(this.libros.map(el=>el.nombre));
    }

}


let usuario = new Usuario("Elon", "Musk");
usuario.getFullName();
usuario.addMascota("Perro");
usuario.addMascota("Gato");
usuario.countMascotas();
usuario.addBook("El señor de las moscas", "William Golding");
usuario.addBook("Fundacion", "Isaac Asimov");
usuario.getBookNames();
console.log(usuario);
