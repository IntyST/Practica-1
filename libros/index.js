// Importar Express
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para leer JSON en el body
app.use(express.json());

// Datos simulados (en memoria)
let libros = [
    { id: 1, titulo: "AWS", autor: "Luciano" },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin" },
    { id: 3, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford" }
];

// Obtener todos los libros o filtrar por autor
app.get('/libros', (req, res) => {
    const autor = req.query.autor;
    if (autor) {
        const filtrados = libros.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
        res.json(filtrados);
    } else {
        res.json(libros);
    }
});

// Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(libro => libro.id === id);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ mensaje: "Libro no encontrado" });
    }
});

// Crear un nuevo libro
app.post('/libros', (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: "Se requiere título y autor" });
    }

    const nuevoLibro = {
        id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
        titulo,
        autor
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// Actualizar un libro por ID
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(libro => libro.id === id);

    if (!libro) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    const { titulo, autor } = req.body;

    if (titulo) libro.titulo = titulo;
    if (autor) libro.autor = autor;

    res.json(libro);
});

// Eliminar un libro por ID
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = libros.findIndex(libro => libro.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    libros.splice(indice, 1);
    res.json({ mensaje: "Libro eliminado correctamente" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
