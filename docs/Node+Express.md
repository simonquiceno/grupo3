
# **NODE + EXPRESS**
## **Que es Node.js**
**Node.js** es un entorno de ejecución de **JavaScript Asíncrono*** multiplataforma que se utiliza para desarrollar aplicaciones de red escalables del lado del servidor que manejan el procesamiento de datos a alta velocidad. Es ideal para usarlo en casos como aplicaciones de chat, juegos en línea y servicios de transmisión.

> *JavaScript Asíncrono: El código puede ejecutarse sin tener que esperar a que termine una tarea antes de empezar otra. Esto mejora la eficiencia y la rapidez de las aplicaciones.

### Aplicaciones que usan Node.js
 - LinkedIn
 - Netflix
 - Uber
 - PayPal

## **Que es Express.js**
**Express.js** es un framework de backend **Node.js** minimalista y rápido, que facilita el desarrollo de aplicaciones web, servicios de backend y APIs. Proporciona una serie de herramientas y funciones que permiten gestionar las rutas, solicitudes HTTP y middleware de manera más sencilla y rápida, sin necesidad de escribir mucho código.

Algunas de las características de Express.js son:

- **Gestión de rutas:** Permite manejar las rutas de manera sencilla y estructurada.
- **Middleware:** Se pueden añadir funciones personalizadas que intercepten las solicitudes, como la autenticación o el manejo de errores.
- **Escalabilidad:** Facilita la creación de aplicaciones escalables y modulares.

## **CRUD con Node.js + Express.js**
Cómo hacer un CRUD (**Crear (Create), Leer (Read), Actualizar (Update), Eliminar (Delete)**) paso a paso con Node.js + Express.js.

### 1. **Instalar Node.js y Express.js**

Primero, se necesita instalar **Node.js** desde la página oficial. Luego, creamos un nuevo proyecto y añadimos Express.js:
    
1-.  **Crear un nuevo proyecto:**  
Abrimos la terminal del sistema o la de Visual Studio Code y navegamos a la carpeta donde queramos crear el proyecto. Luego, escribimos:
```` bash
mkdir nombreProyecto
cd nombreProyecto
npm init -y
````

2-.  **Instalar Express.js:**
En la misma terminal, escribimos:
```` bash
npm install express
````

### 2. **Crear el servidor con Express.js**

Ahora estamos listos para levantar nuestro primer servidor. Crearemos nuestro `app.js` y allí, lo levantaremos en el puerto 3000 y definiremos una ruta sencilla para nuestra primera prueba.
```` javascript
    // Importar Express
    const express = require('express');
    
    // Inicializar la aplicación Express
    const app = express();
    app.use(express.json());  // Permite recibir datos JSON
    
    // Definir el puerto para el servidor
    const PORT = 3000;
    
    // Ruta principal
    app.get('/prueba', (req, res) => {
        res.send('¡Hola Mundo con Node.js y Express!');
    });
    
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
````

Este código hace que el servidor de Express se ejecute en el puerto **3000** y nos permite recibir datos en formato JSON.

### 3. **Crear el servidor con Express.js**

Por último, debemos ejecutar lo siguiente des de la terminal para poder ver nuestro proyecto en el navegador:
```` bash
node ./src/index.js
````

Accedemos desde http://localhost:3000/prueba

### 4. **Crear el servidor con Express.js**

El comando ``node ./src/index.js`` para ejecutar nuestro proyecto de node.js, tiene un problema, y es que cuando lo ejecutamos, guarda en memoria los archivos, y si modificamos alguno de estos, no se recarga automáticamente.

### **Solución con nodemon:**
Nodemon monitorea tu aplicación node.js y reinicia automáticamente el servidor.

Para usar nodemon, necesitamos instalarlo des de la terminal:
```` bash
npm install nodemon -g
````
Ahora que está instalado, ejecutamos el programa como antes hemos hecho, pero cambiando **node** por **nodemon**
```` bash
nodemon ./src/index.js
````

### 5. **Crear el CRUD**

#### **Instalar el paquete pg**
Primero, hay que instalar el paquete pg:

````bash
npm install pg
````

#### **Crear la conexión**
Crea un archivo db.js para la conexión:

````javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'shakila',
  password: 'tu_contraseña',
  port: 5432,
});

module.exports = pool;
````

#### **Usar la conexión en una ruta**
Ejemplo de ruta para obtener estudiantes:

````javascript
const express = require('express');
const pool = require('./db');
const app = express();

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener estudiantes');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
````

- **Crear (POST)**:
````javascript
let students = [];

app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send('Alumno creado');
});
````

- **Leer (GET)**:
````javascript
app.get('/students', (req, res) => {
    res.json(students);
});
````

- **Leer por ID (GET)**:
````javascript
app.get('/students/:id', (req, res) => {
    const student = students.find(u => u.id === req.params.id);
    student ? res.json(student) : res.status(404).send('Alumno no encontrado');
}); 
````

- **Actualizar (PUT)**:
````javascript
app.put('/students/:id', (req, res) => {
    const index = students.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        students[index] = req.body;
        res.send('Alumno actualizado');
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});
````

- **Eliminar (DELETE)**:
````javascript
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        students.splice(index, 1);
        res.send('Alumno eliminado');
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});
````

### 6. **Probar el CRUD**
Para probar nuestro CRUD, podemos usar alguno de estos softwares:
Con **Postman** o **Insomnia**, prueba estas peticiones:

-   **POST**: Crea un alumno (con datos como `id`, `nombre` y `edad`).
-   **GET**: Muestra todos los alumnos.
-   **GET**: Muestra un alumnos específico.
-   **PUT**: Actualiza un alumno.
-   **DELETE**: Elimina un alumno.

### Cómo utilizar **Postman** para probar el CRUD

### 1. Instalar **Postman**

Hay que instalar **Postman** desde su página oficial: [Postman](https://www.postman.com/downloads/)

### 2. Iniciar tu servidor Node.js

Antes de comprobar las solicitudes con **Postman**, hay que utilizar el comando para correr Node.js:

````bash
nodemon app.js
````

### 3. Realizar solicitudes con Postman
Abriremos Postman y crearemos las siguientes solicitudes para probar las operaciones CRUD.

#### 3.1 [POST] Añadir un estudiante
1. Abre Postman.
2. Selecciona el tipo de solicitud como POST.

En la barra de URL, ingresa la URL de tu API (por ejemplo: http://localhost:3000/students).

Ve a la pestaña Body, selecciona raw y elige JSON en el menú desplegable.

En el área de texto, agrega el siguiente cuerpo de la solicitud:

json
Copiar
{
  "nombre": "Juan Pérez",
  "ciclo": "Ingeniería",
  "nota": 8.5
}
Haz clic en Send para enviar la solicitud. Si todo está bien, deberías recibir una respuesta indicando que el estudiante fue añadido correctamente.

## **Ejercicio práctico**
### Sistema de notas de estudiantes
Crea una API para gestionar las notas de los estudiantes, realizando las conexiones a la base de datos de Sakila. Conecta con la base de datos usando el paquete `pg` e implementa las siguientes rutas:

- [POST] Añadir un estudiante con nombre, ciclo y nota.
- [GET] Ver todas las notas: Muestra una lista con los estudiantes y sus notas.
- [GET] Ver las notas de un alumno en concreto.
- [PUT] Actualizar una nota de un estudiante existente.
- [DELETE] Eliminar un estudiante.
