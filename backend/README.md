# Despliegue de Proyecto en AWS usando Docker

Aquí está todo los pasos que se hizo en la práctica para desplegar el proyecto en AWS, utilizando Docker para asegurar que el servicio se mantenga sin necesidad de correr el index.js desde consola.

---

## Requisitos antes de instalar Docker

- Instancia EC2 corriendo Ubuntu.
- Revisar si esta Git instalado en la instancia o intalarlo si no es asi.
- Docker instalado en la instancia
- Proyecto previamente subido a GitHub con estructura backend

---

## Pasos realizados para el despliegue

### 1. Instalar Node.js 22.x LTS

Instalar Node.js 22.x el cual los comandos se encontraron en el link del repositorio oficial de Nodesource:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - 
sudo apt-get install -y nodejs
```

Verificar instalación:

```bash
node -v
```

---

### 2. Verificar o instalar Git

Verificar si Git está instalado:

```bash
git --version
```

Si no está instalado, usar:

```bash
sudo apt install git
```

---

### 3. Clonar el proyecto de GitHub o en mi caso ya lo tengo

- Pero si por ejemplo para clonar se ase de la siguiente manera:
```bash
git clone https://github.com/IntyST/Practica-1.git
```
---

### 4. Instalar dependencias del backend

Dentro de la carpeta `backend`, ejecutar:

```bash
npm i
```

🔹 Este comando lee el archivo `package.json` y descarga todas las dependencias necesarias como `express` y `cors` en mi caso ya no lo hice porque lo avía hecho anteriormente.

---

### 5. Probar que el servidor backend funciona

Ejecutar el archivo `index.js` (en mi caso está configurado para el puerto 8080):
-Comando para correr el proyecto desde el directorio backend

```bash
node index.js
```

🔹 En este punto se puede acceder desde el navegador a el proyecto con la ip:  

---

## Despliegue de Docker
## 6. Paso 1: Instalación de Docker

Dentro de la carpeta del proyecto:
- Primero, actualice su lista existente de paquetes:
```bash
sudo apt update
```
- A continuación, instalar algunos paquetes de requisitos previos que permitan aptutilizar paquetes a través de HTTPS:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
- Agregar el repositorio de Docker a las fuentes de APT:

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```
- Por último, instala Docker:

```bash
sudo apt install docker-ce
```
- Comprobar que se esté ejecutando:
```bash
sudo systemctl status docker
```
Esos son los pasos y comandos que se usó para la instalación de Docker en la instancia de Ubutu.

### 7. Se crea un archivo `Dockerfile` en carpeta `backend`

Contenido del `Dockerfile`:

```dockerfile
FROM node:20.1-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install
COPY index.js .
EXPOSE 8080
CMD ["node", "index.js"]
```

- Explicación para que sirve cada línea:

- `FROM node:20.1-alpine3.18`: Usa una imagen base ligera de Node.js.
- `WORKDIR /app`: Crea una carpeta de trabajo dentro del contenedor.
- `COPY package.json .`: Copia archivo de dependencias.
- `RUN npm install`: Instala las dependencias del proyecto.
- `COPY index.js .`: Copia el servidor.
- `EXPOSE 8080`: Informa a Docker que usará el puerto 8080.
- `CMD ["node", "index.js"]`: Comando por defecto para iniciar la app.

---

### 8. Construir la imagen Docker
- Primero subir los cambios del proyecto al GitHub esto desde el directorio local del proyecto:
```bash
git status
git add .
git commit -m "Descripción"
git push
```
- Luego desde la consola que está conectada ala instancia de Ubuntu actualizar los cambios en el directorio del proyecto ejemplo:
```bash
ubuntu@ip-172-31-81-147:~/Practica-1$
git pull
```

Ahora ingresar a la carpeta `backend` en la consola de la instancia y poner el siguiente comando:

```bash
sudo docker build -t node-hello .
```

🔹 `-t node-hello`: etiqueta la imagen con ese nombre.

---

### 9. Ejecutar contenedor Docker

```bash
sudo docker run -d -p 8080:8080 --name hello --restart on-failure node-hello:latest
```

Explicación:

- `-d`: hace que el contenedor se ejecute en segundo plano, sin que ocupe la terminal.
- `-p 8080:8080`: conecta el puerto 8080 de la laptop con el del contenedor, así se puede acceder a la app desde el navegador.
- `--name hello`: nombra el contenedor como `hello`.
- `--restart on-failure`: reinicia si el contenedor falla.

---

### 10. Verificación

Con el contenedor corriendo, se accede a:

```
http://35.173.134.161:8080/ping
```

Incluso si se cierra la terminal, el servidor sigue funcionando.

Ahora ya no es necesario ejecutar `node index.js` manualmente, Docker se encarga de ello.

---

## Autor

Inty Bryan Simbaña Tuquerres – Despliegue de Web Service en AWS con Docker


