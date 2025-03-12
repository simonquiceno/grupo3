# Creación y carga de base de datos en PostgreSQL

A continuación, se explica cómo crear una base de datos en PostgreSQL y cómo cargar los datos utilizando scripts.

## 1. Crear la base de datos

Para crear una nueva base de datos en PostgreSQL:

1. Abre pgAdmin y conecta a tu servidor de PostgreSQL.
2. Haz clic derecho en "Databases" en el panel de la izquierda.
3. Selecciona la opción **Create > Database**.
4. En la ventana emergente, ingresa el nombre de la base de datos.
5. Haz clic en **Save** para crear la base de datos.

## 2. Cargar el esquema de la base de datos (estructura)

Una vez creada la base de datos, necesitamos cargar su estructura (esquema):

1. Haz clic derecho sobre la base de datos recién creada en el panel de la izquierda.
2. En el menú desplegable, selecciona **Query Tool**.
3. En la ventana de consultas, pega el script proporcionado para la creación de las tablas y la estructura de la base de datos.
   - [Esquema de la base de datos SAKILA.](https://github.com/jOOQ/sakila/blob/main/postgres-sakila-db/postgres-sakila-schema.sql)
4. Haz clic en el botón **Ejecutar** (el ícono de "play" en la parte superior) para ejecutar el script y crear las tablas y objetos necesarios.

## 3. Cargar los datos (inserts)

Una vez que la estructura de la base de datos esté creada, necesitamos cargar los datos:

1. Repite los mismos pasos, pero esta vez con el script que contiene los `INSERT` para cargar los datos en las tablas.
	  - [Script Inserts SAKILA](https://raw.githubusercontent.com/jOOQ/sakila/refs/heads/main/postgres-sakila-db/postgres-sakila-insert-data.sql)
3. Pega el script de inserción de datos en la ventana de **Query Tool**.
4. Haz clic en **Ejecutar** para insertar los datos en las tablas.

## 4. Verificación

Una vez ejecutados los scripts de creación e inserción, vamos a verificar que los datos se hayan cargado correctamente mediante una consulta simple en la base de datos:

```sql
SELECT * FROM film
```