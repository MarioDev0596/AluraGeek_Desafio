// conexionAPI.js

const url = "https://6718430bb910c6a6e02b7c31.mockapi.io/productos";

// const url = "http://localhost:3001/productos" descomentar si se hace uso local //

async function productosAPI() {
    try {
        const conexion = await fetch(url);
        if (!conexion.ok) {
            throw new Error("Error al obtener productos");
        }
        const productos = await conexion.json();
        return productos;
    } catch (error) {
        console.error("Error en productosAPI:", error);
        return [];
    }
}

async function enviarProductos(descripcion, imagen, precio) {
    try {
        const conexion = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                descripcion,
                imagen,
                precio: `${precio}`
            })
        });

        if (!conexion.ok) {
            throw new Error("Error al enviar producto");
        }
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error("Error en enviarProductos:", error);
        return null;
    }
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        if (!conexion.ok) {
            throw new Error("Error al eliminar producto");
        }

        return true;
    } catch (error) {
        console.error("Error en eliminarProducto:", error);
        return false;
    }
}

export const conexionAPI = {
    productosAPI,
    enviarProductos,
    eliminarProducto
};
