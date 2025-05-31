# Web Service de Gestión de Libros

En esta práctica se implementa un **Web Service RESTful** usando **Node.js** y **Express**, que permite realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) sobre libros. El servicio fue desplegado en un contenedor **Docker** y está preparado para ejecutarse fácilmente en una instancia **Ubuntu** en **AWS**.

---

## Dockerfile utilizado

Es el mismo de la práctica anterior:

```dockerfile
FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY index.js .

EXPOSE 8080

CMD [ "node", "index.js" ]
```

---

## Endpoints disponibles

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

Si no se encuentra el libro, devuelve código **404**:

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
  "titulo": "Html 5",
  "autor": "Robert C. Martin"
}
```

**Respuesta exitosa:**

```json
{
  "id": 4,
  "titulo": "HTML 5",
  "autor": "Robert C. Martin"
}
```

Si falta algún campo, devuelve **404** con este mensaje:

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
  "titulo": "Nuevo título"
}
```

**Respuesta:**

```json
{
  "id": 2,
  "titulo": "Nuevo título",
  "autor": "Robert C. Martin"
}
```

Si el **ID no existe**:

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

Si el **ID no existe**:

```json
{ "mensaje": "Libro no encontrado" }
```

---

## Despliegue con Docker

Este **Web Service** fue desplegado en un contenedor **Docker**.  
No se requirió volver a instalar Docker porque ya estaba configurado desde la práctica anterior. Para más información sobre la instalación de Docker, los pasos están en el **README** del directorio de backend.

### Pasos para el despliegue:

1. **Subir cambios al repositorio GitHub**  
   Desde el directorio local del proyecto, ejecutar:

   ```bash
   git status
   git add .
   git commit -m "Descripción"
   git push
   ```

2. **Actualizar cambios en la instancia Ubuntu**  
   Desde la consola conectada a la instancia de AWS, ejecutar:

   ```bash
   git pull
   ```

3. **Ingresar al directorio del proyecto**  
   Ejemplo:

   ```bash
   cd libros
   ```

4. **Construir la imagen Docker**  
   Ejecutar:

   ```bash
   sudo docker build -t libros-service .
   ```

   **Explicación:**
   - `docker build`: Crea una imagen Docker a partir del archivo `Dockerfile`.
   - `-t libros-service`: Asigna el nombre `libros-service` a la imagen.

5. **Ejecutar el contenedor Docker**  
   Ejecutar:

   ```bash
   sudo docker run -d -p 8080:8080 --name libros-api --restart on-failure libros-service
   ```

   **Explicación:**
   - `-d`: Ejecuta el contenedor en segundo plano.
   - `-p 8080:8080`: Mapea el puerto 8080 del host al puerto 8080 del contenedor.
   - `--name libros-api`: Asigna el nombre `libros-api` al contenedor.
   - `--restart on-failure`: Reinicia el contenedor automáticamente si falla.
   - `libros-service`: Nombre de la imagen a utilizar.

---

## Dependencias

- **Node.js**
- **Express**

---

## Autor

**Inty Bryan Simbaña Tuquerres**