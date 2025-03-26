import { Router } from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    // Obtenemos el número de página y el tamaño de página desde la query (con valores por defecto)
    const page = parseInt(req.query.page) || 1;  // Página actual, por defecto la 1
    const pageSize = parseInt(req.query.pageSize) || 50;  // Número de registros por página, por defecto 20
    const offset = (page - 1) * pageSize;  // Calculamos el "offset"

    let result = await pgClient.query(`select film_id, title, description, release_year, language_id, name, rental_duration, rental_rate, length, replacement_cost, rating from film join language using(language_id) limit $1 offset $2`, [pageSize, offset]);

    res.json(result.rows);

    await pgClient.end();
});

route.get('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select film_id, title, description, release_year, language_id, name, rental_duration, rental_rate, length, replacement_cost, rating from film join language using(language_id) where film_id = $1', [req.params.id]);
    res.json(result.rows[0]);

    await pgClient.end();
});

route.post('/', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const data = req.body;

    console.log(data);

    let result = await pgClient.query('insert into film (title,description,release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
        [data.title, data.description, data.release_year, data.language_id, data.rental_duration, data.rental_rate, data.length, data.replacement_cost, data.rating]);
    let wrapper = {
        status: 'ok',
        data: result.rows[0]
    }
    // res.json({ message: 'Pelicula insertada correctamente', film_id: data });
    res.json({ wrapper });

    await pgClient.end();
});

route.put('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const data = req.body;

    let result = await pgClient.query('update film set title = $1, description = $2, release_year = $3, language_id = $4, original_language_id = $5, rental_duration = $6, rental_rate = $7, length = $8, replacement_cost = $9, rating = $10, special_features = $11, last_update = $12 WHERE film_id = $13',
        [data.title, data.description, data.release_year, data.language_id, data.original_language_id, data.rental_duration, data.rental_rate, data.length, data.replacement_cost, data.rating, data.special_features, data.last_update, req.params.id]);
    res.json({ message: 'Pelicula editada correctamente', film_id: req.body.film_id });

    await pgClient.end();
})

route.delete('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let paymentDelete = await pgClient.query('delete from payment where rental_id in (select rental_id from rental where inventory_id in (select inventory_id from inventory where film_id = $1))', [req.params.id]);
    let rentalDelete = await pgClient.query('delete from rental where inventory_id in (select inventory_id from inventory where film_id = $1)', [req.params.id]);
    let inventoryDelete = await pgClient.query('delete from inventory where film_id = $1', [req.params.id]);

    let filmCategoryDelete = await pgClient.query('delete from film_category where film_id = $1', [req.params.id]);
    let filmActorDelete = await pgClient.query('delete from film_actor where film_id = $1', [req.params.id]);

    let filmDelete = await pgClient.query('delete from film where film_id = $1;', [req.params.id]);

    res.json({ message: 'Pelicula eliminada correctamente', film_id: req.params.id });
    await pgClient.end();
})

export default route;