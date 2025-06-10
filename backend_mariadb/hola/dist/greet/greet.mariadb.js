// En este archivo se realiza la conexión a la base de datos MariaDB
// Importa la función necesaria desde 'mariadb'
import mariadb from 'mariadb';
// Importa dotenv para usar variables de entorno
import * as dotenv from 'dotenv';
dotenv.config();
// Define la configuración de conexión
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
};
// Declara la variable de conexión
let connection;
// Función asincrónica que establece la conexión a la base de datos
async function connectToDatabase() {
    connection = await mariadb.createConnection(dbConfig);
}
// Llama a la función de conexión
connectToDatabase();
// Clase que interactúa con la base de datos
export class Greet {
    // Devuelve todos los registros
    static async findAll() {
        return await connection.query('SELECT id, greet, language FROM regards');
    }
    // Busca un saludo por su ID
    static async findById(id) {
        const result = await connection.query('SELECT id, greet, language FROM regards WHERE id = ?', [id]);
        return result[0];
    }
    // Crea un nuevo saludo y lo retorna
    static async create(param) {
        const result = await connection.query('INSERT INTO regards (greet, language) VALUES (?, ?)', [param.greet, param.language]);
        const insertId = result.insertId;
        const newResult = await connection.query('SELECT id, greet, language FROM regards WHERE id = ?', [insertId]);
        return newResult[0];
    }
    // Elimina un saludo por su ID
    static async deleteById(id) {
        const result = await connection.query('DELETE FROM regards WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    // Actualiza un saludo por su ID
    static async updateById(id, param) {
        const result = await connection.query('UPDATE regards SET greet = ?, language = ? WHERE id = ?', [param.greet, param.language, id]);
        if (result.affectedRows > 0) {
            const updated = await connection.query('SELECT id, greet, language FROM regards WHERE id = ?', [id]);
            return updated[0];
        }
        else {
            return null;
        }
    }
    
    // Método para obtener estadísticas
 static async getStats() {
    // Total de registros
    const totalResult = await connection.query(
      'SELECT COUNT(*) as total FROM regards'
    )
    // Convierte BigInt a Number si es necesario
    const totalRaw = totalResult[0]?.total ?? 0
    const total = typeof totalRaw === 'bigint' ? Number(totalRaw) : totalRaw

    // Conteo por idioma
    const countByLanguageRaw = await connection.query(
      'SELECT language, COUNT(*) as count FROM regards GROUP BY language'
    )
    // Convierte los counts a Number si son BigInt
    const countByLanguage = countByLanguageRaw.map((row) => ({
      language: row.language,
      count: typeof row.count === 'bigint' ? Number(row.count) : row.count
    }))

    return {
      total,
      countByLanguage
    }
  }
}
