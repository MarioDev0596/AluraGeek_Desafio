// listarProductos.js

import { conexionAPI } from "./conexionAPI.js";

const list = document.querySelector("#productos-contenedor");
const mensaje = document.querySelector("#mensaje"); // Elemento para mostrar mensajes

function crearCard(descripcion, precio, imagen, id) {
    const listarItem = document.createElement("li");
    listarItem.className = "producto__card__contenedor center";

    const imgProducto = document.createElement("img");
    imgProducto.src = imagen;
    imgProducto.alt = "imagen-producto";
    imgProducto.className = "imagen__producto";

    // Limitar la descripción solo si excede los 28 caracteres
    const descripcionLimitada = descripcion.length > 28 ? `${descripcion.substring(0, 28)}...` : descripcion;

    const descripcionProducto = document.createElement("p");
    descripcionProducto.className = "producto__descripcion";
    descripcionProducto.textContent = descripcionLimitada;

    const precioProducto = document.createElement("p");
    precioProducto.className = "producto__precio";
    precioProducto.textContent = `$ ${precio}`; 

    const iconoEliminar = document.createElement("img");
    iconoEliminar.alt = "icono-eliminar";
    iconoEliminar.src = "./assets/icono-eliminar.png";
    iconoEliminar.className = "icono__eliminar btn_eliminar";
    iconoEliminar.dataset.id = id;

    const footerCard = document.createElement("div");
    footerCard.className = "producto__footer__card center";
    footerCard.appendChild(precioProducto);
    footerCard.appendChild(iconoEliminar);

    const card = document.createElement("div");
    card.className = "producto__card center";
    card.appendChild(imgProducto);
    card.appendChild(descripcionProducto);
    card.appendChild(footerCard);

    listarItem.appendChild(card);

    iconoEliminar.addEventListener("click", async () => {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
            const exito = await conexionAPI.eliminarProducto(id);
            if (exito) {
                listarItem.remove(); // Remueve el elemento del DOM después de eliminarlo
                mostrarAlerta("Producto eliminado con éxito.");
            } else {
                mostrarAlerta("Error al eliminar el producto. Inténtalo de nuevo.");
            }
        }
    });

    return listarItem;
}

async function listarProductos() {
    const listaAPI = await conexionAPI.productosAPI();

    listaAPI.forEach((producto) => {
        list.appendChild(
            crearCard(producto.descripcion, producto.precio, producto.imagen, producto.id)
        );
    });
}

function mostrarAlerta(mensajeTexto, tipo) {
    mensaje.textContent = mensajeTexto;
    mensaje.classList.add(tipo); // Agrega la clase de estilo (success o error)
    mensaje.style.display = "block"; // Muestra el contenedor de mensaje

    // Oculta el mensaje después de 4 segundos
    setTimeout(() => {
        console.log("Ocultando la alerta");
        mensaje.style.display = "none"; // Oculta el mensaje
        mensaje.classList.remove(tipo); 
    }, 4000); 
}

listarProductos();
