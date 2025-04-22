// Importar Express
const express = require('express');

// Inicializar la aplicación Express
const app = express();

// Definir el puerto para el servidor
const PORT = 3000;

const libros = [
    { id: 1, titulo: "AWS", autor: "Luciano" },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin" },
    { id: 3, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford" }
];

// Endpoint para obtener un libro por su ID


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


// Método 1: Obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// Método 2: Obtener un libro por su ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const libro = libros.find(libro => libro.id === id);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ mensaje: "Libro no encontrado" });
    }
});
