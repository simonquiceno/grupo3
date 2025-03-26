document.addEventListener('DOMContentLoaded', () => {
    // Spinner
    let spinner = document.getElementById("spinner");
    // Body de la tabla
    let tabla = document.querySelector('#film_table tbody');
    // Página actual
    let currentPage = 1;
    // Número de registros por página
    let pageSize = 50;
    // Boton de añadir Modal
    let btnModalAñadir = document.getElementById('boton_añadir_modal');
    // Ventana Modal Crear
    let modalAñadir = document.getElementById('modalFilm');
    // Ventana Modal Actualizar
    let modalActualizar = document.getElementById('modalFilmUpd');
    // Boton Cerrar Modal
    let closeModalAñadir = document.getElementById('cerrarModalAñadir');
    // Boton Cerrar Modal Actualizar
    let closeModalActualizar = document.getElementById('cerrarModalActualizar');
    // Boton crear Film (Dentro de Modal)
    let btnCrear = document.getElementById('btnCrear');
    // Boton actualizar Film
    let btnActualizar = document.getElementById('btnActualizar');
    // Select añadir language
    let selectLanguage = document.getElementById('añadir_language_id');
    // Input ID Film
    // let selectFilmId = document.getElementById('film_id');


    // Función asíncrona para obtener todos los posts
    async function filterTable(page) {
        spinner.style.display = "block";
        try {
            // let response = await fetch("http://localhost:3080/film");
            let response = await fetch(`http://localhost:3080/film?page=${page}&pageSize=${pageSize}`);
            let films = await response.json();
            tabla.innerHTML = '';

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
    filterTable(currentPage);

    /* Agregar eventos a los botones de paginación */
    // Siguiente página
    const nextPage = document.getElementById('nextPage');
    nextPage.addEventListener('click', () => {
        currentPage++;
        filterTable(currentPage);
    });

    // Página anterior
    const prevPage = document.getElementById('prevPage');
    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterTable(currentPage);
        } else {
            console.log('Ya estas en la primnera página');
        }
    });


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
            "release_year": isNaN(parseInt(release_year.value)) ? null : parseInt(release_year.value),
            // "release_year": parseInt(release_year.value),
            "language_id": isNaN(parseInt(añadir_language_id.value)) ? null : parseInt(añadir_language_id.value),
            "rental_duration": isNaN(parseInt(rental_duration.value)) ? null : parseInt(rental_duration.value),
            "rental_rate": isNaN(parseInt(rental_rate.value)) ? null : parseInt(rental_rate.value),
            "length": isNaN(parseInt(length.valueOf())) ? null : parseInt(length.valueOf()),
            "replacement_cost": isNaN(parseFloat(replacement_cost.value)) ? null : parseFloat(replacement_cost.value),
            "rating": rating.value
        }
        await createFilm(film);
    });

    // Cargar los languages
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

    // Crear una nueva Film
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

    // Gestión de botones ventana - Actualizar

    // Botón cerrar modal Update
    closeModalActualizar.addEventListener('click', () => {
        modalActualizar.close();
    });

    // Botón guardar modal Update
    btnActualizar.addEventListener('click', () => {
        updateInventory();
    })

    // Fetch Update
    async function loadFilmUpdate(e) {
        modalActualizar.showModal();
        let idActualizar = e.target.getAttribute('data-id');

        try {
            // Consulta de la Film por su ID
            let responseFilm = await fetch(`http://localhost:3080/film/${idActualizar}`)
            let dataFilm = await responseFilm.json();
            
            // Consulta de los Lenguages
            let responseLanguage = await fetch(`http://localhost:3080/language`);
            let dataLanguages = await responseLanguage.json();

            // Aquí cargamos las películas (para tener todo en el desplegable)
            actualizar_language_id_upd.innerHTML = '<option value="" disabled>Selecciona un lengauge</option>'; // Limpia opciones
            for (const language of dataLanguages) {
                let optionAdd = document.createElement('option')
                optionAdd.value = language.language_id;
                optionAdd.textContent = language.name;
                actualizar_language_id_upd.appendChild(optionAdd);
            };

            // Cargar ID Film
            film_id_upd.value = dataFilm.film_id;

            // Cargar Titulo Film
            title_upd.value = dataFilm.title;

            // Cargar Descripción Film
            description_upd.value = dataFilm.description;

            // Cargar Año de Salida Film
            release_year_upd.value = dataFilm.release_year;

            // Cargar option lenguaje seleccionado
            actualizar_language_id_upd.innerHTML = '<option value="" disabled>Selecciona un lengauge</option>'; // Limpiar opciones
            let optionLanguage = document.createElement('option');
            optionLanguage.textContent = dataFilm.name;
            optionLanguage.value = dataFilm.language_id;
            optionLanguage.selected = true;
            actualizar_language_id_upd.appendChild(optionLanguage);

            // Cargar Duración del Alquiler Film
            rental_duration_upd.value = dataFilm.rental_duration;

            // Cargar Rate del Alquiler Film
            rental_rate_upd.value = dataFilm.rental_rate;

            // Cargar Length Film
            length_upd.value = dataFilm.length;

            // Cargar Replacement Cost Film
            replacement_cost_upd.value = dataFilm.replacement_cost;

            // Cargar option lenguaje seleccionado
            rating_upd.innerHTML = '<option value="" disabled>Selecciona un lengauge</option>'; // Limpiar opciones
            let optionRating = document.createElement('option');
            optionRating.textContent = dataFilm.rating;
            optionRating.value = dataFilm.rating;
            optionRating.selected = true;
            rating_upd.appendChild(optionRating);

        } catch (error) {
            console.log(error);
        }
    }
});
