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
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // Método HTTP POST para crear
  headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON
  body: JSON.stringify({ title: "Nueva publicación", body: "Contenido del post", userId: 1 }) // Convertimos el objeto a JSON
})
  .then(response => response.json()) // Convertimos la respuesta
  .then(data => console.log("Registro creado:", data)) // Mostramos la respuesta del servidor
  .catch(error => console.error("Error al crear registro:", error));
```
### READ
```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json()) // Convertimos la respuesta a JSON
  .then(data => console.log("Publicaciones:", data)) // Mostramos los datos
  .catch(error => console.error("Error al obtener datos:", error));
```
### UPDATE
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT", // Método PUT para actualizar
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Título actualizado", body: "Nuevo contenido", userId: 1 }) // Enviamos los nuevos datos
})
  .then(response => response.json())
  .then(data => console.log("Registro actualizado:", data))
  .catch(error => console.error("Error al actualizar registro:", error));
```
### DELETE
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE" // Método DELETE para eliminar
})
  .then(response => {
    if (response.ok) console.log("Registro eliminado correctamente");
    else console.error("Error al eliminar");
  })
  .catch(error => console.error("Error en la eliminación:", error));
```
## EJERCICIO PRÁCTICO FETCH

Crea un pequeña aplicación con Fetch: Agrega un botón al index.html que al clicarlo, permita mostrar un Post. Reutiliza la API JSONPlaceholder.
