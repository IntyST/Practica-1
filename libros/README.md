# Web Service de Gestión de Libros 📚

Este proyecto implementa un Web Service RESTful usando **Node.js** y **Express**, que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de libros. El servicio fue desplegado en un contenedor Docker y está preparado para ejecutarse fácilmente en una instancia Ubuntu en AWS.

---

## 🚀 Endpoints disponibles

### 🔹 `GET /libros`
Devuelve todos los libros en formato JSON.  
**Ejemplo de respuesta:**

```json
[
  { "id": 1, "titulo": "AWS", "autor": "Luciano" },
  { "id": 2, "titulo": "Clean Code", "autor": "Robert C. Martin" }
]
```

---

### 🔹 `GET /libros/:id`
Devuelve un libro específico por su ID.  
**Ejemplo:** `GET /libros/2`  
**Respuesta:**

```json
{ "id": 2, "titulo": "Clean Code", "autor": "Robert C. Martin" }
```

Si no se encuentra el libro:

```json
{ "mensaje": "Libro no encontrado" }
```

---

### 🔹 `GET /libros?autor=nombre`
Filtra libros por autor.  
**Ejemplo:** `GET /libros?autor=luciano`  
**Respuesta:**

```json
[
  { "id": 1, "titulo": "AWS", "autor": "Luciano" }
]
```

---

### 🔹 `POST /libros`
Crea un nuevo libro.  
**Body esperado (JSON):**

```json
{
  "titulo": "Nuevo Libro",
  "autor": "Inty ST"
}
```

**Respuesta exitosa:**

```json
{
  "id": 4,
  "titulo": "Nuevo Libro",
  "autor": "Inty ST"
}
```

Si falta algún campo:

```json
{ "mensaje": "Se requiere título y autor" }
```

---

### 🔹 `PUT /libros/:id`
Actualiza un libro por su ID.  
**Ejemplo:** `PUT /libros/2`  
**Body:**

```json
{
  "titulo": "Clean Code Reeditado"
}
```

**Respuesta:**

```json
{
  "id": 2,
  "titulo": "Clean Code Reeditado",
  "autor": "Robert C. Martin"
}
```

Si el ID no existe:

```json
{ "mensaje": "Libro no encontrado" }
```

---

### 🔹 `DELETE /libros/:id`
Elimina un libro por ID.  
**Ejemplo:** `DELETE /libros/3`  
**Respuesta:**

```json
{ "mensaje": "Libro eliminado correctamente" }
```

Si el ID no existe:

```json
{ "mensaje": "Libro no encontrado" }
```

---

## 🐳 Despliegue con Docker

Este Web Service fue desplegado en un contenedor Docker.  
No se requirió volver a instalar Docker porque ya estaba configurado desde la práctica anterior.

### Dockerfile utilizado:

```Dockerfile
FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY index.js .

EXPOSE 8080

CMD [ "node", "index.js" ]
```

### Comandos Docker usados:

```bash
# Construir la imagen
docker build -t libros-service .

# Ejecutar el contenedor
docker run -p 8080:8080 libros-service
```

---

## 📦 Dependencias

- **Node.js**
- **Express**

---

## 👨‍💻 Autor

**Inty Bryan Simbaña Tuquerres**  
_Primer periodo académico 2025_  
_Docente: Ing. Ana Montenegro_
