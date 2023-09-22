document.addEventListener("DOMContentLoaded", function () {
  let shoppingCartArray = [];
  let total = 0;
  let productContainer = document.querySelector("#card");
  let totalElement = document.querySelector(".cart-total-title");
  let totalProductsElement = document.getElementById("numerito");
  let icon = document.querySelector("#icon");
  let carrito = document.querySelector("#carrito");
  let seguirComprando = document.querySelector("#seguirComprando");
  let comprar = document.querySelector("#comprar");
  let contenedorMensaje = document.getElementById("mensaje");
  let productos;


  //LLAMADA A LA API
  const url = "https://api.escuelajs.co/api/v1/products";

  const getProductos = async () => {
    const res = await fetch(url);
    const data = await res.json();
    productos = data.slice(1, 9);
    console.log(productos);
    //CARGAR LOS DATOS EN UNA CARD
    productos.forEach((product) => {
      productContainer.innerHTML += `
                <div class="card " style="width: 18rem;" id="${product.id}" >
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h4 class="card-title">${product.title}</h4>
                        <p class="card-text">${product.description}</p>
                        <h5 class="card-text">$${product.price}</h5>
                        <button class="btn btn-primary shop-item-button">AGREGAR</button>
                    </div>
                </div>`;
    });

    let addBtn = document.querySelectorAll(".shop-item-button");
    addBtn = [...addBtn];

    // BUSCADOR LETRA POR LETRA
    const buscarInput = document.getElementById("buscar");

    buscarInput.addEventListener("input", function () {
      const filtro = this.value.toLowerCase();

      const productosFiltrados = productos.filter((producto) =>
        producto.title.toLowerCase().includes(filtro)
      );

      productContainer.innerHTML = "";

      productosFiltrados.forEach((producto) => {
        productContainer.innerHTML += `
                    <div class="card " style="width: 18rem;" id="${producto.id}" >
                        <img src="${producto.images[0]}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.title}</h5>
                            <p class="card-text">${producto.description}</p>
                            <button class="btn btn-primary shop-item-button">AGREGAR</button>
                        </div>
                    </div>`;
      });

      let addBtn = document.querySelectorAll(".shop-item-button");
      addBtn = [...addBtn];
    });

    let cartContainer = document.querySelector(".cart-items");

    addBtn.forEach( (btn) => {
      btn.addEventListener("click", (event) => {
        console.log("click");
        console.log(event);
        //AGREGAR PRODUCTOS AL CARRITO

        //Buscar id del producto
        let actualID = parseInt(event.target.parentNode.parentNode.id);
        console.log(actualID);
        //Con el id buscar el producto actual
        let actualProduct = productos.find((item) => item.id == actualID);
        if (actualProduct.quantity === undefined) {
          actualProduct.quantity = 1;
        }
        actualProduct.price = parseFloat(actualProduct.price); // Convierte el precio a un número decimal
        console.log(actualProduct.id);

        //Preguntar si el producto que estoy agregando existe
        let existe = false;
        shoppingCartArray.forEach((prod) => {
          if (actualID == prod.id) {
            existe = true;
          }
        });

        if (existe) {
          actualProduct.quantity++;
        } else {
          shoppingCartArray.push(actualProduct);
        }

        console.log(shoppingCartArray);


        

        //Dibujar en  el dom el arreglo de compras actualizado
        function drawItems() {
          cartContainer.innerHTML = "";
          let totalItems = 0;
          shoppingCartArray.forEach((item) => {
            totalItems += item.quantity;
            cartContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.images[0]}" width="100" height="100">
                    <span class="cart-item-title">${item.title}</span>
                </div>
                <span class="cart-price cart-column">$${item.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button" id="btn-remover">REMOVE</button>
                </div>
            </div>`;
          });
          totalProductsElement.textContent = totalItems;
          removeItems();
          upDateNumberOfItems();
        }

        //Actualizar valor total
        total = getTotal();
        drawItems();
        upDateNumberOfItems();
        removeItems();

        function getTotal() {
          let sumTotal;
          let total = shoppingCartArray.reduce((sum, item) => {
            sumTotal = sum + item.quantity * item.price;
            return sumTotal;
          }, 0);
          totalElement.innerText = `$${total}`;
        }

        function upDateNumberOfItems() {
          let inputNumber = document.querySelectorAll(".cart-quantity-input");
          inputNumber = [...inputNumber];

          inputNumber.forEach((item) => {
            item.addEventListener("input", (event) => {
              //Conseguir título del producto
              let actualCarrTitle =
                event.target.parentElement.parentElement.childNodes[1]
                  .innerText;
              let actualObjectQuantity = parseInt(event.target.value);
              //Buscar el objeto con ese titulo
              let actualizarObject = shoppingCartArray.find(
                (item) => item.title == actualCarrTitle
              );
              console.log(actualizarObject);
              //Actualizar el numero en quantity
              actualizarObject.quantity = actualObjectQuantity;

              //Actualizar contador
              totalProductsElement.textContent = shoppingCartArray.length;
              //Acutalizar el precio total
              getTotal();
            });
          });
        }

        function removeItems() {
          let removeBtn = document.querySelectorAll("#btn-remover");
          removeBtn = [...removeBtn];
          removeBtn.forEach((btn) => {
            btn.addEventListener("click", (event) => {
              //Conseguir el titulo del objeto
              let actualCarrTitle =
                event.target.parentElement.parentElement.childNodes[1]
                  .innerText;
              //Busco el objeto con ese titulo
              let actualizarObject = shoppingCartArray.find(
                (item) => item.title == actualCarrTitle
              );
              console.log(actualizarObject);
              //Remover el arreglo de productos
              shoppingCartArray = shoppingCartArray.filter(
                (item) => item != actualizarObject
              );
              //Actualizar el precio total
              drawItems();
              getTotal();
              upDateNumberOfItems();
            });
          });
        }
      });
    });
    comprar.addEventListener("click", () => {
        if (shoppingCartArray.length >= 1) {
            print();
          
        } else {
            contenedorMensaje.innerHTML = "No hay productos en el carrito";
          console.log(shoppingCartArray.length >= 1);
            
        }
      });
  };

  getProductos();
 


const obtenerCategorias = async () => {
  const url = "https://api.escuelajs.co/api/v1/products";
  const res = await fetch(url);
  const data = await res.json();

  const categoriasSet = new Set();

  data.forEach((product) => {
    categoriasSet.add(product.category.name);
  });

  return Array.from(categoriasSet);
};

obtenerCategorias().then((categorias) => {
  console.log(categorias);
});

const llenarSelectCategorias = async () => {
  const categorias = await obtenerCategorias();
  const selectCategorias = document.getElementById("categoria");

  // Agrega una opción para seleccionar todas las categorías
  const opcionTodas = document.createElement("option");
  opcionTodas.value = "todas";
  opcionTodas.textContent = "Todas las categorías";
  selectCategorias.appendChild(opcionTodas);

  // Agrega una opción por defecto
  const optionDefault = document.createElement("option");
  optionDefault.disabled = true;
  optionDefault.selected = true;
  optionDefault.value = "";
  optionDefault.textContent = "Selecciona una categoría";
  selectCategorias.appendChild(optionDefault);

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectCategorias.appendChild(option);
  });
};

llenarSelectCategorias();

document.getElementById("categoria").addEventListener("change", function () {
  const categoriaSeleccionada = this.value;

  // Limpia el contenedor de productos
  productContainer.innerHTML = "";

  // Filtra los productos según la categoría seleccionada
  if (categoriaSeleccionada === "todas") {
    productos.forEach((product) => {
      productContainer.innerHTML += `
                    <div class="card " style="width: 18rem;" id="${product.id}" >
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h4 class="card-title">${product.title}</h4>
                            <p class="card-text">${product.description}</p>
                            <h5 class="card-text">$${product.price}</h5>
                            <button class="btn btn-primary shop-item-button">AGREGAR</button>
                        </div>
                    </div>`;
    });
  } else {
    const productosFiltrados = productos.filter(
      (producto) => producto.category.name === categoriaSeleccionada
    );

    productosFiltrados.forEach((product) => {
      productContainer.innerHTML += `
                    <div class="card " style="width: 18rem;" id="${product.id}" >
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h4 class="card-title">${product.title}</h4>
                            <p class="card-text">${product.description}</p>
                            <h5 class="card-text">$${product.price}</h5>
                            <button class="btn btn-primary shop-item-button">AGREGAR</button>
                        </div>
                    </div>`;
    });
  }
});

icon.addEventListener("click", () => {
  carrito.classList.remove("noActive");
  card.classList.add("noActive");
});

seguirComprando.addEventListener("click", () => {
  carrito.classList.add("noActive");
  card.classList.remove("noActive");
});

});
