document.addEventListener('DOMContentLoaded', () => {
    let spinner = document.getElementById("spinner");
    let tabla = document.getElementById('tablaInventario');

    async function filterTable(){
        spinner.style.display = "block";
        try {
            let response = await fetch('http://localhost:3080/inventory');
            let data = await response.json();
            tabla.innerHTML = '';
            
            data.forEach(registro =>{
                let fila = document.createElement('tr')

                fila.innerHTML = `
                <td>${registro.inventory_id}</td>
                <td>${registro.film_id}</td>
                <td>${registro.store_id}</td>
                <td>${registro.film_title}</td>
                <td>
                    <button class="eliminar" data-id="${registro.inventory_id}">Eliminar</button>
                    <button class="editar" data-id="${registro.inventory_id}">Editar</button>
                </td>
                `;
                tabla.appendChild(fila)
            });

        
            // Cuando carguen los datos quitamos ese spiner
            spinner.style.display = "none";

            // IMPORTANTE, AQUÍ HAY QUE ASOCIAR EL EVENTO DE LOS BOTONES DE ELIMINAR Y EDITAR
            let botonDelete = document.querySelectorAll('.eliminar');
            botonDelete.forEach(boton => {
                boton.addEventListener('click', deleteRecord);
            })

            // aquí es para actualizar

            let botonActualizar = document.querySelectorAll('.editar');
            botonActualizar.forEach(boton => {
                boton.addEventListener('click', loadInventoryUpdate)
            })

            
            

        } catch (error) {
            console.log(error)
        }
    }
    

    filterTable();
    // DELETE

    async function deleteRecord(event){
        let idDelete = event.target.getAttribute('data-id');
        try {
            let response = await fetch (`http://localhost:3080/inventory/${idDelete}`, 
                {method: "DELETE"});
                if (response.ok) {
                    filterTable(); // Recargar la tabla después de eliminar
                } else {
                    alert('Error al eliminar el registro');
                }
        } catch (error) {
            console.log(error);
        }
    }
    



    // GESTIÓN DE BOTONES VENTANAS - AÑADIR

    //botón abrir
    let btnModalAñadir = document.getElementById('boton_añadir_modal');
    // ventana
    let modalAñadir = document.getElementById('modalInventario');
    //boton cerrar
    let closeModalAñadir = document.getElementById('cerrarModalAñadir');
    //boton crear
    let btnCrear = document.getElementById('btnCrear');
    btnModalAñadir.addEventListener('click', () => {
        modalAñadir.showModal();
        loadInventory()
    });
    closeModalAñadir.addEventListener('click', () => {
        modalAñadir.close();
    });
    btnCrear.addEventListener('click', () => {
        createInventory();
    })

    // Aquí se cargan los datos en la vwentana para añadir un registro
    async function loadInventory() {
        try {
            let response = await fetch('http://localhost:3080/film/')
            let data = await response.json();

            let responseStore = await fetch('http://localhost:3080/store/');
            let dataStore = await responseStore.json();


            // Cargamos las películas aquí
            let selectFilm = document.getElementById('añadir_film_id');
            selectFilm.innerHTML = '<option value="" disabled selected>Seleccione una película</option>'; // Limpia opciones
            data.forEach(opcion => {
                let optionAdd = document.createElement('option')
                optionAdd.value = opcion.film_id;
                optionAdd.textContent = opcion.title;
                selectFilm.appendChild(optionAdd);
            });


            // Cargamos las tiendas aquí
            let selectStore = document.getElementById('añadir_store_id');
            selectStore.innerHTML = '<option value="" disabled selected>Seleccione una store</option>'; // Limpia opciones
            dataStore.forEach(option => {
                let optionStore = document.createElement('option');
                optionStore.value = option.store_id;
                optionStore.textContent = option.store_id;
                selectStore.appendChild(optionStore);
            })


           
        } catch (error) {
            console.log(error)
        }
    }

    // CREAR
    async function createInventory() {
        let selectFilm = document.getElementById('añadir_film_id');
        let selectStore = document.getElementById('añadir_store_id');
        let selectInventoryid = document.getElementById('inventory_id');

        console.log("Valor de inventory_id:", selectInventoryid.Value);
        if(selectFilm.value != '' && selectStore.value != '' && selectInventoryid.value != ''){
            try {
                let response = await fetch("http://localhost:3080/inventory", {
                    method: "POST", // Método HTTP POST para crear
                    headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON
                    body: JSON.stringify({
                        inventory_id: selectInventoryid.value,
                        film_id: selectFilm.value,
                        store_id: selectStore.value
                    })  // Convertimos el objeto a JSON
                  });

                let data = await response.json()
                if(response.ok) {
                    console.log('hecho')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    // GESTIÓN DE BOTONES VENTANAS - AÑADIR

    // botón cerrar
    let closeModalActualizar = document.getElementById('cerrarModalActualizar');
    closeModalActualizar.addEventListener('click', () => {
        let modalActualizar = document.getElementById('modalInventarioActualizar');
        modalActualizar.close();
    });

    let btnActualizar = document.getElementById('btnActualizar');
    btnActualizar.addEventListener('click', () => {
        createInventory();
    })
    // ACTUALIZAR
    async function loadInventoryUpdate(event) {
        let modalActualizar = document.getElementById('modalInventarioActualizar');
        modalActualizar.showModal();
        let idActualizar = event.target.getAttribute('data-id');

        try {
            let response = await fetch(`http://localhost:3080/inventory/${idActualizar}`);
            let data = await response.json();
            console.log('inventory_id' + data.inventory_id);
            console.log('film id' + data.film_id);
            console.log('título' + data.film_title);
            console.log(data);

            let selectInventoryid_v2 = document.getElementById('inventory_id_v2');
            let selectFilm_v2 = document.getElementById('actualizar_film_id_v2');
            let selectStore_v2 = document.getElementById('actualizar_store_id_v2');

            selectInventoryid_v2.value = data.inventory_id;

            // Opción seleccionada de film_id
            selectFilm_v2.value = data.film_id;

            let optionFilm = document.createElement('option')
            optionFilm.textContent = data.film_title
            optionFilm.value = data.film_id
            optionFilm.selected = true;
            selectFilm_v2.appendChild(optionFilm)

            // Opción seleccionada de store
            selectStore_v2.value = data.store_id;

            let optionStore = document.createElement('option')
            optionStore.textContent = data.store_id
            optionStore.value = data.store_id
            optionStore.selected = true;
            selectStore_v2.appendChild(optionStore)


        } catch (error) {
            console.log(error);
        }

    }

    async function updateInventory() {

    }
    
  
})
