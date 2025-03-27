document.addEventListener('DOMContentLoaded', () => {
    // Spinner
    let spinner = document.getElementById("spinner");
    // Body de la tabla
    let tabla = document.querySelector('#film_table tbody');
    // Página actual
    let currentPage = 1;
    // Número de registros por página
    let pageSize = 100;


    // #region Función asíncrona para obtener todos los posts
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
            for (const boton of document.querySelectorAll('.editar')) {
                boton.addEventListener('click', loadFilmUpdate);
            }

            // Eliminar
            for (const boton of document.querySelectorAll('.eliminar')) {
                boton.addEventListener('click', deleteRecord);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // #endregion

    // Llamamos a la función para ejecutar la petición
    filterTable(currentPage);

    // #region Agregar eventos a los botones de paginación
    // Siguiente página
    nextPage.addEventListener('click', () => {
        currentPage++;
        filterTable(currentPage);
    });

    // Página anterior
    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterTable(currentPage);
        } else {
            console.log('Ya estas en la primnera página');
        }
    });
    // #endregion

    // #region GESTIÓN DE BOTONES VENTANAS - AÑADIR

    // Ventana Modal Crear
    let modalAñadir = document.getElementById('modalFilm');

    // Boton de añadir Modal
    let btnModalAñadir = document.getElementById('boton_añadir_modal');
    btnModalAñadir.addEventListener('click', () => {
        modalAñadir.showModal();
        loadLanguage();
    });

    // Boton Cerrar Modal
    let closeModalAñadir = document.getElementById('cerrarModalAñadir');
    closeModalAñadir.addEventListener('click', () => {
        modalAñadir.close();
    });

    // Boton crear Film (Dentro de Modal)
    let btnCrear = document.getElementById('btnCrear');

    btnCrear.addEventListener('click', async () => {
        let film = {
            "film_id": film_id.value,
            "title": title.value,
            "description": description.value,
            "release_year": isNaN(parseFloat(release_year.value)) ? null : parseFloat(release_year.value),
            // "release_year": parseInt(release_year.value),
            "language_id": isNaN(parseFloat(añadir_language_id.value)) ? null : parseFloat(añadir_language_id.value),
            "rental_duration": isNaN(parseFloat(rental_duration.value)) ? null : parseFloat(rental_duration.value),
            "rental_rate": isNaN(parseFloat(rental_rate.value)) ? null : parseFloat(rental_rate.value),
            "length": isNaN(parseFloat(length.valueOf())) ? null : parseFloat(length.valueOf()),
            "length": isNaN(parseFloat(length.value)) ? null : parseFloat(length.value),
            "replacement_cost": isNaN(parseFloat(replacement_cost.value)) ? null : parseFloat(replacement_cost.value),
            "rating": rating.value
        }
        await createFilm(film);
    });
    // #endregion

    // #region Cargar los languages
    async function loadLanguage() {
        // Select añadir language
        let selectLanguage = document.getElementById('añadir_language_id');
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
    // #endregion

    // #region Crear una nueva Film
    async function createFilm(film) {
        try {
            let response = await fetch('http://localhost:3080/film', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(film)
            });
        } catch (error) {
            console.log(error);
        }
    }
    // #endregion

    // #region Fetch Delete
    async function deleteRecord(e) {
        let idDelete = e.target.getAttribute('data-id');
        try {
            let response = await fetch(`http://localhost:3080/film/${idDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) filterTable(currentPage);
            else alert('Error al eliminar el registro');
        } catch (error) {
            console.log(error);
        }
    }
    // #endregion

    // #region Gestión de botones ventana - Actualizar

    // Ventana Modal Actualizar
    let modalActualizar = document.getElementById('modalFilmUpd');

    let closeModalActualizar = document.getElementById('cerrarModalActualizar');
    closeModalActualizar.addEventListener('click', () => {
        modalActualizar.close();
    });


    // Fetch Update
    async function loadFilmUpdate(e) {
        modalActualizar.showModal();
        let idActualizar = e.target.getAttribute('data-id');

        try {
            // Consulta de la Film por su ID
            let responseFilm = await fetch(`http://localhost:3080/film/${idActualizar}`);
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

    // Boton actualizar Film
    let btnActualizar = document.getElementById('btnActualizar');
    btnActualizar.addEventListener('click', () => {
        updateFilm();
    })

    // Guardar los nuevos datos de Film
    async function updateFilm() {
        console.log('Llega')
        if (film_id_upd.value != '' && title_upd.value != '' && description_upd.value != '' &&
            release_year_upd.value != '' && actualizar_language_id_upd.value != '' && rental_duration_upd.value != '' &&
            rental_rate_upd.value != '' && length_upd.value != '' && replacement_cost_upd.value != '' && rating_upd.value != '') {
                console.log('Llega mas')
            try {
                let response = fetch(`http://localhost:3080/film/${film_id_upd.value}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        film_id: film_id_upd.value,
                        title: title_upd.value,
                        description: description_upd.value,
                        release_year: isNaN(parseFloat(release_year_upd.value)) ? null : parseFloat(release_year_upd.value),
                        language_id: isNaN(parseFloat(actualizar_language_id_upd.value)) ? null : parseFloat(actualizar_language_id_upd.value),
                        rental_duration: isNaN(parseFloat(rental_duration_upd.value)) ? null : parseFloat(rental_duration_upd.value),
                        rental_rate: isNaN(parseFloat(rental_rate_upd.value)) ? null : parseFloat(rental_rate_upd.value),
                        length: isNaN(parseFloat(length_upd.value)) ? null : parseFloat(length_upd.value),
                        replacement_cost: isNaN(parseFloat(replacement_cost_upd.value)) ? null : parseFloat(replacement_cost_upd.value),
                        rating: rating_upd.value
                    })
                });
                if (response.ok) {
                    console.log('hecho')
                    let modalActualizar = document.getElementById('modalFilmUpd');
                    modalActualizar.close();
                    filterTable(currentPage);
                } else {
                    console.error('Error al actualizar la película:', await response.text());
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    // #endregion
});
