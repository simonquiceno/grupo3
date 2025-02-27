# CARGA ASÍNCRONA CON FETCH
## INTRODUCCIÓN

### ¿Qué es Fetch?
Fetch es una API moderna que realiza peticiones HTTP de manera asíncrona, se utiliza para obtener o enviar datos a un servidor. Retorna una promesa, lo que significa que el código no se detiene mientras espera la respuesta del servidor, permitiendo un código más limpio y fácil de manejar. 

Es útil en el desarrollo de aplicaciones que interactúan con bases de datos, ya que permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre la información de un servidor.

### Solicitudes Síncronas y Asíncronas

Como anteriormente se comentó, una solitud Asíncrona permite que el código se siga ejecutando sin necesidad de esperar una respuesta del servidor (Fetch), mientras que Síncrona es todo lo contrario.
Ejemplo:
#### Síncrona
```js
let request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/posts/1", false); // false = síncrono
request.send();
console.log(request.responseText); // No se ejecuta hasta recibir la respuesta
```

#### Asíncrona (Fetch)

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
console.log("Este mensaje aparece antes de recibir la respuesta del servidor.");
```

## CRUD con FETCH

| Operación | Método HTTP |
|--|--|
| CREATE | **POST** |
| READ | **GET** |
| UPDATE | **PUT** |
| DELETE | **DELETE** |

***

### CREATE
```js
// Definimos una función asíncrona para crear un nuevo post
async function crearPost() {
  try {
    // Hacemos una petición HTTP con fetch usando el método POST
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // Especificamos que queremos enviar datos (Crear un nuevo recurso)
      
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo de la petición es JSON
      
      body: JSON.stringify({ 
        title: "Nueva publicación",  // Título del post
        body: "Contenido del post",  // Contenido del post
        userId: 1  // ID del usuario que está creando el post
      }) // Convertimos el objeto JavaScript a formato JSON antes de enviarlo
    });

    // Esperamos a que la respuesta del servidor se convierta en JSON
    let data = await response.json();

    // Mostramos en la consola el objeto recibido como respuesta
    console.log("Registro creado:", data);
  } catch (error) {
    // Capturamos cualquier error en la petición y lo mostramos en la consola
    console.error("Error al crear registro:", error);
  }
}

// Llamamos a la función para ejecutar la petición
crearPost();

```
### READ
```js
// Función asíncrona para obtener todos los posts
async function obtenerPublicaciones() {
  try {
    // Hacemos una petición GET con fetch para obtener los datos del servidor
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");

    // Convertimos la respuesta en JSON
    let data = await response.json();

    // Mostramos los datos en la consola
    console.log("Publicaciones:", data);
  } catch (error) {
    // Capturamos cualquier error en la petición
    console.error("Error al obtener datos:", error);
  }
}

// Llamamos a la función para ejecutar la petición
obtenerPublicaciones();

```
### UPDATE
```js
// Función asíncrona para actualizar un post
async function actualizarPost(id) {
  try {
    // Hacemos una petición PUT con fetch para modificar un recurso existente
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT", // Método HTTP para actualizar datos
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify({ 
        title: "Título actualizado", 
        body: "Nuevo contenido", 
        userId: 1 
      }) // Convertimos el objeto a JSON antes de enviarlo
    });

    // Convertimos la respuesta en formato JSON
    let data = await response.json();

    // Mostramos en la consola la respuesta del servidor
    console.log("Registro actualizado:", data);
  } catch (error) {
    // Capturamos cualquier error y lo mostramos
    console.error("Error al actualizar registro:", error);
  }
}

// Llamamos a la función con el ID del post que queremos actualizar
actualizarPost(1);

```
### DELETE
```js
// Función asíncrona para eliminar un post
async function eliminarPost(id) {
  try {
    // Hacemos una petición DELETE con fetch para eliminar un recurso
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE" // Método HTTP para eliminar un recurso
    });

    // Verificamos si la respuesta fue exitosa
    if (response.ok) {
      console.log(`Registro con ID ${id} eliminado correctamente`);
    } else {
      console.error("Error al eliminar");
    }
  } catch (error) {
    // Capturamos cualquier error y lo mostramos
    console.error("Error en la eliminación:", error);
  }
}

// Llamamos a la función con el ID del post que queremos eliminar
eliminarPost(1);

```
## EJERCICIO PRÁCTICO FETCH

Crea un pequeña aplicación con Fetch: Agrega 4 botones al index.html que al clicarlos, permita Crear/Mostrar/Actualizar/Eliminar un Post. Reutiliza la API JSONPlaceholder.
