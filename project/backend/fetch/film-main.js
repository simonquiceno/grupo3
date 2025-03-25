document.addEventListener('DOMContentLoaded', () => {
    // Spinner
    let spinner = document.getElementById("spinner");
    // Body de la tabla
    let tabla = document.querySelector('#film_table tbody');
    // Boton de añadir Modal
    let btnModalAñadir = document.getElementById('boton_añadir_modal');
    // Ventana Modal
    let modalAñadir = document.getElementById('modalInventario');
    // Boton Cerrar Modal
    let closeModalAñadir = document.getElementById('cerrarModalAñadir');
    // Boton crear Film (Dentro de Modal)
    let btnCrear = document.getElementById('btnCrear');



    // Función asíncrona para obtener todos los posts
    async function filterTable() {
        spinner.style.display = "block";
        try {
            let response = await fetch("http://localhost:3080/film");
            let films = await response.json();

            for (let film of films) {
                tabla.innerHTML += `
                <tr>
                    <td>${film.film_id}</td>
                    <td>${film.title}</td>
                    <td>${film.description}</td>
                    <td>${film.release_year}</td>
                    <td>${film.name}</td>
                    <td>${film.rental_duration}</td>
                    <td>${film.rental_rate}</td>
                    <td>${film.length}</td>
                    <td>${film.replacement_cost}</td>
                    <td>${film.rating}</td>
                    <td>
                        <i class="fas fa-edit editar" data-id="${film.film_id}"></i>
                        <i class="fa-solid fa-circle-xmark eliminar" data-id="${film.film_id}"></i>
                    </td>
                </tr>`
            };

            // Cuando carguen los datos quitamos escondemos el Spiner
            spinner.style.display = "none";

            /* Asociar el evento de los botones ELIMINAR y EDITAR */
            // Actualizar
            let botonActualizar = document.querySelectorAll('.editar');
            botonActualizar.forEach(boton => {
                boton.addEventListener('click', loadFilmUpdate);
            });

            // Eliminar
            let botonDelete = document.querySelectorAll('.eliminar');
            botonDelete.forEach(boton => {
                boton.addEventListener('click', deleteRecord);
            });

        } catch (error) {
            console.log(error);
        }
    }
    // Llamamos a la función para ejecutar la petición
    filterTable();


    async function deleteRecord(params) {
        
    }

    async function saveFilm(film) {
        fetch('film', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(film)
        });
        
    }




    async function loadFilm(params) {

    }
})