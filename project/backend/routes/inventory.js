import { Router } from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

// route.post();

// GET COMPLETO
route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query(
        'select inventory.inventory_id, inventory.film_id, inventory.store_id, film.title AS film_title from inventory join film on inventory.film_id = film.film_id');
    res.json(result.rows);

    await pgClient.end();
});

// GET POR ID
route.get('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select inventory.inventory_id, inventory.film_id, inventory.store_id, film.title AS film_title from inventory join film using(film_id) where inventory_id = $1', [req.params.id]);
    res.json(result.rows[0]);

    await pgClient.end();
}); 

// INSERT
route.post('/', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const data = req.body
    let result = await pgClient.query('insert into inventory values ($1, $2, $3)', [data.inventory_id, data.film_id, data.store_id]);
    res.json(result.rows[0]);

    await pgClient.end();
});


// UPDATE
route.put('/:id', async(req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let data = req.body
    let inventory_id = req.params.id

    let result = await pgClient.query('update inventory set film_id = $1, store_id = $2 where inventory_id = $3', 
        [data.film_id, data.store_id, inventory_id]);
    res.json({ message: "Inventario actualizado correctamente", data: result.rows[0] });

    await pgClient.end();
})

// DELETE
route.delete('/:id', async(req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result1 = await pgClient.query('delete from payment where rental_id in (select rental_id from rental where inventory_id = $1)', [req.params.id]);
    let result2 = await pgClient.query('delete from rental where inventory_id in (select inventory_id from rental where inventory_id = $1)', [req.params.id]);
    let result3 = await pgClient.query('delete from inventory where inventory_id = $1', [req.params.id]);
    res.json();

    await pgClient.end();
})

export default route;