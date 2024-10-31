// form.js

import { conexionAPI } from "./conexionAPI.js";

const form = document.querySelector("#form");
const mensaje = document.querySelector("#mensaje");

function mostrarAlerta(mensajeTexto, tipo) {
    mensaje.textContent = mensajeTexto;
    mensaje.classList.add(tipo); // Agrega la clase de estilo (success o error)
    mensaje.style.display = "block"; 

    // Oculta el mensaje después de 8 segundos
    setTimeout(() => {
        mensaje.style.display = "none"; 
        mensaje.classList.remove(tipo); 
    }, 8000); // Duración en milisegundos (8 segundos)
}

// Función para validar si la URL de la imagen es válida
function validarURLImagen(url) {
    const regex = /\.(jpeg|jpg|png|gif)$/i; // Expresión regular para verificar extensiones de imagen
    return regex.test(url);
}

function validarCampos(descripcion, precio, imagen) {
    return descripcion && !isNaN(precio) && validarURLImagen(imagen);
}

async function crearProducto(event) {
    event.preventDefault(); 

    // Obtener valores de los campos del formulario
    const descripcion = document.querySelector("#descripcion").value;
    const precio = parseFloat(document.querySelector("#precio").value);
    const imagen = document.querySelector("#imagen").value;

    if (!validarCampos(descripcion, precio, imagen)) {
        mostrarAlerta("Todos los campos son obligatorios y la URL de la imagen debe ser válida.", "error");
        return;
    }

    const resultado = await conexionAPI.enviarProductos(descripcion, imagen, precio);

    if (resultado) {
        mostrarAlerta("Producto agregado con éxito.", "success");
        form.reset();
        await listarProductos(); 
    } else {
        mostrarAlerta("Error al agregar el producto. Inténtalo de nuevo.", "error");
    }
}

form.addEventListener("submit", crearProducto);
