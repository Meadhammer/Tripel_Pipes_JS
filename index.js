
class Producto {
    constructor (id, nombre, precio, descripcion, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.status = true;
        this.vendido = false;
    }
    novedad () {
        this.status = false;
    }
    sale () {
        this.vendido = true;
    }
    show () {
        alert(`
        Id: ${this.id} 
        Nombre: ${this.nombre} 
        Precio: $${this.precio}
        `);
    }
}

const stock = [];
const ids = stock.map (item => {
    return {
        id: item.id,
    }
});
let opcion = "";
let select = "";

const carga = () => {
    do {
        let nombre = prompt(`Ingrese el nombre del producto`).toLowerCase();
        let precio = parseFloat(prompt(`Ingrese el precio del producto`));
        let descripcion = prompt(`Ingrese una breve descripcion del producto`).toLowerCase();
        let imagen = prompt(`cargue una imagen del producto`);
        let id = (Math.max(0,...ids)) + 1;
        const nuevoProducto = new Producto (id, nombre, precio, descripcion, imagen);
        stock.push(nuevoProducto);
        ids.push(id);
        nuevoProducto.show();
        menu2 ();
        select = "end";
    }while(select === 1);
};

const consultaStock = (consulta) => {
    do {
        for (let index = 0; index < stock.length; index++) {
            consulta = stock[index];
            consulta.show();
        }
        menu2();
        select = "end";
    }while(select === 2);
};

const menu1 = () => {
    opcion = prompt(
        `Ingrese una opción para continuar 
         1 - para ingresar 
         END - para salir`
        );
    while(opcion !== "end") {
        switch(opcion){
            case "1":
                logIn ();
                break;
            case "end":
                alert("Hasta luego");
                break;
            default:
                alert("Ingrese una opción válida");
                opcion = prompt(
                    `Ingrese una opción para continuar 
                     1 - Ingresar 
                     END - Salir`
                    );
        }
    }
};

const menu2 = () => {
    select = prompt(`
        Seleccione una opción para continuar 
        1 - Ingresar producto nuevo 
        2 - Consultas 
        END - Salir
    `);
    while(select !== "end") {
        switch(select){
            case "1":
                carga ();
                break;
            case "2":
                consultaStock ();
                break;
            case "end":
                alert("Hasta luego");
                opcion = "end";
                break;
            default:
                alert("Ingrese una opción válida");
                select = prompt(`
                Seleccione una opción para continuar 
                1 - Ingresar producto nuevo 
                2 - Consultas 
                END - Salir
            `);
        }
    }
};

let validacion = (a, b) => {if (a === b) {return true;}else {return false;}};

const admin = { name: "julio", email: "jftripel@gmail.com", password: "admin1234" };

const logIn = () => {
    let name = prompt("Ingrese su nombre o escriba END para salir").toLowerCase();
    if(name === "") {
        do {
            alert("No ha ingresado ningún nombre");
            name = prompt("Ingrese su nombre").toLowerCase();
        }while(name === "")
    }else if(name === "end") {
        alert("Hasta luego");
        opcion = "end";
    }else {
        let e = 0;
        while(e < 4) {
            if(name === admin.name) {
                let password = prompt("Ingrese su contraseña").toLowerCase();
                for (i = 0; i < 3; i++) {
                    if (validacion (password, admin.password) === true) {
                        i = 3;
                        alert(`Hola ${name}, bienvenido devuelta`);
                        menu2 ();
                        opcion = "end";
                    }else {
                        alert(`La contraseña no coincide, vuelva a intentar (intentos: ${(3 - i)} )`);
                        password = prompt("Vuelva a ingresar su contraseña").toLowerCase();
                    }
                }
                e = 4;
            }else if(name === "end") {
                alert("Hasta luego");
                e = 4;
            }else {
                alert("No es un usuario válido");
                let errar = (3 - e);
                name = prompt(`Ingrese su nombre, tienes ${errar} intentos más`).toLowerCase();
                e++;
            }
            opcion = "end";
        }
    }
};



alert("Bienvenido! Identifiquese para comenzar a trabajar");

menu1 ();

alert("FIN! Para volver a comenzar recargue la página");

