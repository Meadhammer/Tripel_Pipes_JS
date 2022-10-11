//Creación de producto
class Producto {
    constructor (id, nombre, precio, descripcion, imagenes) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.status = true;
        this.vendido = false;
        this.span = `
          <span class="badge rounded-pill text-bg-warning"> Nueva!!!</span>
          `;
    }
    noNovedad () {
        this.status = false;
        this.span =" ";
    }
    sold () {
        this.vendido = true;
    }
}

//Declaraciones

let getStock = [];
fetch("./stock.json")
.then((response) => response.json())
.then ((data) => {
  data.forEach((elemento) =>{
      getStock.push(elemento)
  })
});
console.log(getStock);
let stock = JSON.parse(localStorage.getItem("stockStorage")) || getStock;
console.log(stock);

const contenedor = document.getElementById ("contenedor");
const ficha = document.getElementById ("ficha");
const menuCarga = document.querySelector(".menuCarga");
const menuConsulta = document.querySelector(".menuConsulta");
let lastId = 1;
let iter = 0;

//funciones de apoyo

function show (prod, hid) {
  let article = document.createElement ("article");
  let hidden = hid && "hidden";
  article.className = "col-12 col-lg-6 col-xxl-4";
  article.innerHTML = `
      <h4 ${hidden}>ID: ${prod.id}</h4>
      <div class="card" style="width: 22rem;">
          <img src="${prod.imagenes[0]}" class="card-img-top" alt="pipa${prod.id}">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre} ${prod.span}</h5>
            <p class="card-text">${prod.descripcion}</p>
            <p class="card-text">Precio: <b>$${prod.precio}</b></p>
            <input type="button" value="Ver más" class="boton" data-bs-toggle="modal" data-bs-target="#mpipa${prod.id}">
                      <!-- Modal -->
                      <div class="modal fade" id="mpipa${prod.id}" tabindex="-1" aria-labelledby="mpipa${prod.id}Label" aria-hidden="true">
                          <div class="modal-dialog modal-xl modal-fullscreen-md-down">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title" id="mpipa${prod.id}Label">${prod.nombre}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                      <!-- inicio carrusel -->
                                      <div id="carousel${prod.id}Indicators" class="carousel slide" data-bs-ride="true">
                                          <div class="carousel-indicators">
                                            <button type="button" data-bs-target="#carousel${prod.id}Indicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carousel${prod.id}Indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carousel${prod.id}Indicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                          </div>
                                          <div class="carousel-inner">
                                            <div class="carousel-item active">
                                              <img src="${prod.imagenes[0]}" class="d-block w-100" alt="pipa${prod.id}_1">
                                            </div>
                                            <div class="carousel-item">
                                              <img src="${prod.imagenes[1]}" class="d-block w-100" alt="pipa${prod.id}_2">
                                            </div>
                                            <div class="carousel-item">
                                              <img src="${prod.imagenes[2]}" class="d-block w-100" alt="pipa${prod.id}_3">
                                            </div>
                                          </div>
                                          <button class="carousel-control-prev" type="button" data-bs-target="#carousel${prod.id}Indicators" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                          </button>
                                          <button class="carousel-control-next" type="button" data-bs-target="#carousel${prod.id}Indicators" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                          </button>
                                      </div>
                                      <!-- fin carrusel -->
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- fin modal -->
          </div>
        </div>
  `;
  contenedor.append(article);
};

function recorrer (arr, func, bul) {
  for (let item of arr) {
    func(item, bul);
  };
};

function ids (item) {
  while (parseInt(item.id) >= lastId){
    lastId++;
  };
};

//Funciones operativas

function loadCarga(e) {
  e.preventDefault();
  ficha.innerHTML = "";
  contenedor.innerHTML = "";
  let div = document.createElement ("div");
  div.className = "container-lg";
  div.innerHTML = `
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="Nombre" class="col-form-label">Nombre</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="text" id="Nombre" name="name" placeholder="Producto" class="form-control" aria-describedby="NameHelpInline">
          </div>
          <div class="col-4">
            <span id="NameHelpInline" class="form-text">
              Ingrese el nombre del producto
            </span>
          </div>
      </div>
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="Precio" class="col-form-label">Precio</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="number" id="Precio" name="price" placeholder="Precio" class="form-control" aria-describedby="priceHelpInline">
          </div>
          <div class="col-4">
            <span id="priceHelpInline" class="form-text">
              Ingrese el precio
            </span>
          </div>
      </div>
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="Descripcion" class="col-form-label">Descripción</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="text" id="Descripcion" name="itemDesc" placeholder="Descripción" class="form-control caja" aria-describedby="itemDescHelpInline">
          </div>
          <div class="col-4">
            <span id="itemDescHelpInline" class="form-text">
              Ingrese una descripción
            </span>
          </div>
      </div>
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="imagen1" class="col-form-label">Imagen portada</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="text" id="file1" name="image1" placeholder="Imagen 1" class="form-control" aria-describedby="imageHelpInline">
          </div>
          <div class="col-4">
            <span id="imageHelpInline" class="form-text">
              Ingrese la URL de la imagen de portada
            </span>
          </div>
      </div>
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="imagen2" class="col-form-label">Segunda imagen</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="text" id="file2" name="image2" placeholder="Imagen 2" class="form-control" aria-describedby="imageHelpInline">
          </div>
          <div class="col-4">
            <span id="imageHelpInline" class="form-text">
              Ingrese la URL de la segunda imagen
            </span>
          </div>
      </div>
      <div class="row mb-3 g-3 align-items-center justify-content-center">
          <div class="col-12 col-sm-2 col-md-4 text-sm-end">
            <label for="imagen3" class="col-form-label">Tercera imagen</label>
          </div>
          <div class="col-sm-8 col-md-4">
            <input type="text" id="file3" name="image3" placeholder="Imagen 3" class="form-control" aria-describedby="imageHelpInline">
          </div>
          <div class="col-4">
            <span id="imageHelpInline" class="form-text">
              Ingrese la URL de la tercera imagen
            </span>
          </div>
      </div>
      <div class="row m-0 pb-5 g-3 align-items-center justify-content-center">
          <div class="col-auto">
              <input type="submit" value="Aceptar" class="boton">
              <input type="reset" value="Borrar todo" class="boton">
          </div>
      </div>
  `;
  ficha.append(div);
  for (iter; iter<1; iter++) {
    carga();
  }
};

const carga = () => {
    contenedor.innerHTML = "";
    ficha.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(lastId);
      contenedor.innerHTML = "";
      let nombre = document.getElementById("Nombre").value;
      let precio = document.getElementById("Precio").value;
      let descripcion = document.getElementById("Descripcion").value;
      let imagenes = [
        document.getElementById("file1").value,
        document.getElementById("file2").value,
        document.getElementById("file3").value
      ];
      console.log(imagenes);
      console.log(lastId);
      recorrer (stock, ids);
      console.log(lastId);
      let id = lastId;
      const nuevoProducto = new Producto (id, nombre, precio, descripcion, imagenes);
      console.log(nuevoProducto);
      stock.push(nuevoProducto);
      localStorage.setItem("stockStorage", JSON.stringify(stock));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Nuevo producto ingresado',
        showConfirmButton: false,
        timer: 1500
      })
      show(nuevoProducto, false);
      console.log(lastId);
      console.log(stock);
    });
};

const menuEditar = (producto) => {
  let div = document.createElement ("div");
  div.className = "row m-0 pb-5 g-3 align-items-center justify-content-center";
    div.innerHTML = `
        <div class="col-auto">
            <input type="button" value="Editar Nombre" class="boton" id="editarNombre">
            <input type="button" value="Editar Precio" class="boton" id="editarPrecio">
            <input type="button" value="Editar Descripción" class="boton" id="editarDesc">
            <input type="button" value="Eliminar Producto" class="boton" id="eliminarProd">
        </div>
    `;
  contenedor.append(div);
  console.log(producto);
  const inputValue = producto;
  console.log(inputValue);
  let editarNombre =  document.getElementById("editarNombre");
  editarNombre.addEventListener("click", async () => {
    const { value: nombreEdit } = await Swal.fire({
      title: 'Nombre del producto',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputLabel: 'Ingrese el nombre deseado',
      inputValue: inputValue.nombre,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir algo!'
        }
      }
    })
    if (nombreEdit) {
      Swal.fire(`Nombre cambiado a: ${nombreEdit}`)
      inputValue.nombre = nombreEdit;
      console.log(inputValue);
      localStorage.setItem("stockStorage", JSON.stringify(stock));
      contenedor.innerHTML ="";
      show(inputValue);
    }
  });
  let editarPrecio =  document.getElementById("editarPrecio");
  editarPrecio.addEventListener("click", async () => {
    const { value: precioEdit } = await Swal.fire({
      title: 'Precio del producto',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputLabel: 'Ingrese el precio deseado',
      inputValue: inputValue.precio,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir algo!'
        }
      }
    })
    if (precioEdit) {
      Swal.fire(`El precio cambiado a: ${precioEdit}`)
      inputValue.precio = precioEdit;
      console.log(inputValue);
      localStorage.setItem("stockStorage", JSON.stringify(stock));
      contenedor.innerHTML ="";
      show(inputValue);
    }
  });
  let editarDesc =  document.getElementById("editarDesc");
  editarDesc.addEventListener("click", async () => {
    const { value: descEdit } = await Swal.fire({
      title: 'Descripcion del producto',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputLabel: 'Ingrese un descripción',
      inputValue: inputValue.descripcion,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir algo!'
        }
      }
    })
    if (descEdit) {
      Swal.fire(`El precio cambiado a: ${descEdit}`)
      inputValue.descripcion = descEdit;
      console.log(inputValue);
      localStorage.setItem("stockStorage", JSON.stringify(stock));
      contenedor.innerHTML ="";
      show(inputValue);
    }
  });
  let eliminarProd = document.getElementById("eliminarProd");
  eliminarProd.addEventListener("click", async () => {
    const { value: accept } = await Swal.fire({
      title: 'Eliminar Producto',
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder:
        'Desea eliminar el producto?',
      confirmButtonText:
        'Continue <i class="fa fa-arrow-right"></i>',
      showCancelButton: true,
    })
    if (accept) {
      Swal.fire('Producto eliminado');
      console.log(inputValue);
      stock.splice(stock.indexOf(inputValue), 1);
      console.log(inputValue);
      console.log(stock);
      localStorage.setItem("stockStorage", JSON.stringify(stock));
      contenedor.innerHTML ="";
      recorrer(stock, show);
    }
  });
};

const menuBuscar = (e) => {
  e.preventDefault();
  contenedor.innerHTML ="";
  let busqueda = document.querySelector("#buscar").value;
  let producto = stock.find(item => item?.nombre === busqueda || item?.id == busqueda);
  console.log(producto);
  producto ? show(producto, false) : recorrer(stock, show, false);
  producto && menuEditar(producto);
};

const consultaStock = (e) => {
    e.preventDefault();
    ficha.innerHTML = "";
    contenedor.innerHTML = "";
    let div = document.createElement ("div");
    div.className = "row m-0 pb-5 g-3 align-items-center justify-content-center";
    div.innerHTML = `
        <div class="col-auto">
            <input type="search" name="btnbuscar" placeholder="Buscar Producto" class="form-control" id="buscar">
        </div>
    `;
    ficha.append(div);
    recorrer (stock, show, true);
    ficha.addEventListener("submit", menuBuscar);
    ficha.addEventListener("change", menuBuscar);
};

//Interfaz de usuario
menuCarga.addEventListener("click", loadCarga);

menuConsulta.onclick = consultaStock;