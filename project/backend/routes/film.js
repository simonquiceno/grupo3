import { Router } from "express";
import express from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

// route.use(express.json());

route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select * from film');
    res.json(result.rows);

    await pgClient.end();
});

route.get('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    // let resultMal = await pgClient.query('select * from film where film_id = '+ req.params.id +';');
    let result = await pgClient.query('select * from film where film_id = $1', [req.params.id]);
    res.json(result.rows[0]);

    await pgClient.end();
});

route.post('/', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const data = req.body;

    console.log(data);

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('insert into film (title,description,release_year,language_id,original_language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features,last_update) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [data.title, data.description, data.release_year, data.language_id, data.original_language_id, data.rental_duration, data.rental_rate, data.length, data.replacement_cost, data.rating, data.special_features, data.last_update]);
    res.json({ message: 'Pelicula insertada correctamente', film_id: data});

    await pgClient.end();
});

route.put('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    // let result = await pgClient.query('alter table')
    const data = req.body;

    let result = await pgClient.query('update film set title = $1, description = $2, release_year = $3, language_id = $4, original_language_id = $5, rental_duration = $6, rental_rate = $7, length = $8, replacement_cost = $9, rating = $10, special_features = $11, last_update = $12 WHERE film_id = $13',
        [data.title, data.description, data.release_year, data.language_id, data.original_language_id, data.rental_duration, data.rental_rate, data.length, data.replacement_cost, data.rating, data.special_features, data.last_update, req.params.id]);
    res.json({ message: 'Pelicula editada correctamente', film_id: req.body.film_id });

    await pgClient.end();
})

route.delete('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let inventoryId = await pgClient.query('select inventory_id from inventory where film_id = $1', [req.params.id]);
    let rentalId = await pgClient.query('select rental_id from rental where inventory_id = $1', [inventoryId]);
    let paymentDelete = await pgClient.query('delete from payment where rental_id = $1', [rentalId]);
    let rentalDelete = await pgClient.query('delete from rental where inventory_id = $1', [inventoryId]);
    let inventoryDelete = await pgClient.query('delete from inventory where film_id = $1', [req.params.id]);
    
    let filmCategoryDelete = await pgClient.query('delete from film_category where film_id = $1', [req.params.id]);
    let filmActorDelete = await pgClient.query('delete from inventory where film_actor = $1', [req.params.id]);

    let filmDelete = await pgClient.query('delete from film where film_id = $1', [req.params.id]);

    res.json({ message: 'Pelicula eliminada correctamente', film_id: req.params.id });
    await pgClient.end();
})

export default route;