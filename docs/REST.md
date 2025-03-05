# REST: Representational State Transfer

## Introducción a REST

REST (Representational State Transfer) es un estilo de arquitectura para el desarrollo de servicios web. Se basa en los principios de la web para crear sistemas escalables, flexibles y fáciles de mantener. REST permite que las aplicaciones se comuniquen entre sí a través de la web utilizando peticiones HTTP estándar.
Los sistemas RESTful están diseñados para operar con recursos, que pueden ser cualquier tipo de entidad representada en un servidor, como usuarios, productos o pedidos. Estos recursos se identifican mediante URLs y se manipulan utilizando métodos HTTP.

## Caracteristicas de REST

1.  **Cliente-Servidor**: La interfaz está separada del almacenamiento de datos.
    
2.  **Sin estado**: Cada petición del cliente contiene toda la información necesaria para procesarla.
    
3.  **Caché**: Se pueden almacenar respuestas para mejorar el rendimiento.
    
4.  **Interfaz uniforme**: Se accede a los recursos de una manera estándar.
    
5.  **Sistema en capas**: La arquitectura permite múltiples capas intermedias entre cliente y servidor.
    
6.  **Código bajo demanda (Opcional)**: Se pueden enviar fragmentos de código ejecutable al cliente.

## Métodos HTTP en REST

REST utiliza los métodos HTTP estándar para interactuar con los recursos:
**GET:** Obtener un recurso

**POST:** Crear un nuevo recurso

**PUT:** Actualizar un recurso existente

**DELETE:** Eliminar un recurso


## Exercici de prova

**Preparacion del ejercicio:**

Crea un proyecto de node con servidor en Express:

- **Abre `server.js` y copia el siguiente código:**
```js
const express = require('express');
const app = express();
app.use(express.json());

let libros = [
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", anio_publicacion: 1943 },
    { id: 2, titulo: "1984", autor: "George Orwell", anio_publicacion: 1949 }
];

// Obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    libro ? res.json(libro) : res.status(404).json({ mensaje: "Libro no encontrado" });
});

// Agregar un nuevo libro
app.post('/libros', (req, res) => {
    const nuevoLibro = { id: libros.length + 1, ...req.body };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// Actualizar un libro existente
app.put('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });

    libro.titulo = req.body.titulo || libro.titulo;
    libro.autor = req.body.autor || libro.autor;
    libro.anio_publicacion = req.body.anio_publicacion || libro.anio_publicacion;

    res.json(libro);
});

// Eliminar un libro
app.delete('/libros/:id', (req, res) => {
    libros = libros.filter(l => l.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
```
-  **Ejecutar el servidor:**
```
node server.js
```
> Ejercicio: 

***Utiliza la git bash donde ya viene implementado curl para poder hacer uso de los metodos HTTP***

- **Enunciado:**  
Estás desarrollando una aplicación para una librería digital. La librería necesita una API REST para **gestionar su catálogo de libros**, permitiendo a los administradores agregar, modificar y eliminar libros

- **Los libros deben tener los siguientes atributos:**

	-   `id` (Número único)
	-   `titulo` (Texto)
	-   `autor` (Texto)
	-   `anio_publicacion` (Número)
	
------------------------------------------------------------

1. *Obtener todos los libros:*

2. *Obtener un libro por ID:*

3. *Agregar un nuevo libro:*

4. *Actualizar un libro:*

5. *Eliminar un libro:*

