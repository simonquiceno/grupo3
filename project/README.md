# Sakila Project

## Instalación:

Hacer 
``` bash
git clone https://github.com/simonquiceno/grupo3.git
```

Clonamos el projecto desde github para tener el proyecto en local.

``` bash
cd project
```

Nos ubicamos dentro de la carpeta del proyecto.

``` bash
npm install express
```

Instalamos el packete de express para gestionar las rutas y middlewares.

``` bash
npm install pg
```

Instalamos el packete de pg para establecer la conexión con la Base de Datos.

## Ejecución

Creamos el fichero ".vscode/launch.json" desde Ctrl+Shift+D - "Create a launch.json file".

Dentro del archivo "launch.json", añadimos lo siguiente:
``` json
"runtimeArgs": [
    "--watch"
],
```

Ejecutamos el projecto desde "F5".