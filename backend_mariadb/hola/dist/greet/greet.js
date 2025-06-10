// Este archivo define las rutas de la API para interactuar con los saludos
import { Hono } from 'hono'; // Importa el framework Hono para crear rutas
import { Greet } from '../greet/greet.mariadb.js'; // Importa la clase y tipo para manejar saludos
const greet = new Hono(); // Crea una nueva instancia de Hono para las rutas
// Ruta GET para obtener todos los saludos
greet.get('/regards', async (c) => {
    const results = await Greet.findAll();
    return c.json(results);
});

// Ruta GET para estadísticas de saludos
greet.get('/greet/stats', async (c) => {
  const stats = await Greet.getStats()
  return c.json(stats)
})

// Ruta GET para obtener un saludo específico por ID
greet.get('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await Greet.findById(id);
    return c.json(result);
});
// Ruta POST para crear un nuevo saludo
greet.post('/greet', async (c) => {
    const param = await c.req.json();
    const result = await Greet.create(param);
    return c.json(result, 201);
});
// Ruta DELETE para eliminar un saludo por ID
greet.delete('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const success = await Greet.deleteById(id);
    if (success) {
        return c.text('Saludo eliminado correctamente.');
    }
    else {
        return c.text('Saludo no encontrado.', 404);
    }
});
// Ruta PUT para actualizar un saludo por ID
greet.put('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const param = await c.req.json();
    const updated = await Greet.updateById(id, param);
    if (updated) {
        return c.json(updated);
    }
    else {
        return c.text('Saludo no encontrado para actualizar.', 404);
    }
});

export default greet; // Exporta el router para que pueda ser usado en otro archivo
