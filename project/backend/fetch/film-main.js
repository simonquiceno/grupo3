document.addEventListener('DOMContentLoaded', () => {
    // Spinner
    let spinner = document.getElementById("spinner");
    // Body de la tabla
    let tabla = document.querySelector('#film_table tbody');
    // Boton de añadir Modal
    let btnModalAñadir = document.getElementById('boton_añadir_modal');
    // Ventana Modal Crear
    let modalAñadir = document.getElementById('modalFilm');
    // Ventana Modal Actualizar
    let modalActualizar = e.target.getElementById('modalFilmUpd');
    // Boton Cerrar Modal
    let closeModalAñadir = document.getElementById('cerrarModalAñadir');
    // Boton crear Film (Dentro de Modal)
    let btnCrear = document.getElementById('btnCrear');
    // Select añadir language
    let selectLanguage = document.getElementById('añadir_language_id');
    // Input ID Film
    // let selectFilmId = document.getElementById('film_id');


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


    // GESTIÓN DE BOTONES VENTANAS - AÑADIR

    btnModalAñadir.addEventListener('click', () => {
        modalAñadir.showModal();
        loadLanguage();
    });
    closeModalAñadir.addEventListener('click', () => {
        modalAñadir.close();
    });

    btnCrear.addEventListener('click', async () => {
        let film = {
            "film_id": film_id.value,
            "title": title.value,
            "description": description.value,
            "release_year": release_year.valueOf(),
            "language": añadir_language_id.value,
            "rental_duration": rental_duration.valueOf(),
            "rental_rate": rental_rate.valueOf(),
            "length": length.valueOf(),
            "replacement_cost": replacement_cost.valueOf()
        }
        await createFilm(film);
    });

    async function loadLanguage() {
        try {
            let response = await fetch("http://localhost:3080/language");
            let films = await response.json();

            selectLanguage.innerHTML = '<option value="" disabled selected>Selecciona un lengauje</option>'; // Limpia opciones
            for (const film of films) {
                let optionAdd = document.createElement('option')
                optionAdd.value = film.language_id;
                optionAdd.textContent = film.name;
                selectLanguage.appendChild(optionAdd);
            }
        } catch (error) {
            console.log(error);
        }

    }

    async function createFilm(film) {
        try {
            let response = await fetch('http://localhost:3080/film', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(film)
            });
        } catch (error) {
            console.log(error);
        }
    }


    // Fetch Delete
    async function deleteRecord(e) {
        let idDelete = e.target.getAttribute('data-id');
        try {
            let response = await fetch(`http://localhost:3080/film/${idDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                filterTable();
            } else {
                alert('Error al eliminar el registro');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch Update

    async function loadFilmUpdate(e) {
        modalActualizar.showModal();
        let idActualizar = e.target.getAttribute('data-id');

        try {
            // Consulta de la Film por su ID
            let responseFilm = await fetch(`http://localhost:3080/film/${idActualizar}`)
            let dataFilms = await responseFilm.json();
            // Consulta de los Lenguages
            let responseLanguage = await fetch(`http://localhost:3080/language`);
            let dataLanguage = await responseLanguage.json();

            let selectLanguage_upd = document.getElementById('actualizar_language_id_upd');

            // Cargamos las películas aquí ( para tener todo en el desplegable)
            selectLanguage_upd.innerHTML = '<option value="" disabled>Selecciona un lengauge</option>'; // Limpia opciones
            dataFilms.forEach(opcion => {
                let optionAdd = document.createElement('option')
                optionAdd.value = opcion.film_id;
                optionAdd.textContent = opcion.title;
                selectLanguage_upd.appendChild(optionAdd);
            });

            selectLanguage_upd.innerHTML = '<option value="" disabled>Selecciona un lengauge</option>'; // Limpia opciones
            for (const film of dataFilms) {
                let optionAdd = document.createElement('option')
                optionAdd.value = film.language_id;
                optionAdd.textContent = film.name;
                selectLanguage.appendChild(optionAdd);
            }

        } catch (error) {
            console.log(error);
        }

    }
});
