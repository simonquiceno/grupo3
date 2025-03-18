import { Router } from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

// route.post();

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

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('insert into film (film_id,title,description,release_year,language_id,original_language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features,last_update) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [req.params.id]);
    res.json(result.rows[0]);

    await pgClient.end();
});

route.put('/:id', async(req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('alter table')

    await pgClient.end();
})

route.delete('/:id', async(req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('delete from film where film_id = $1 cascade', [req.params.id]);
    res.write(`Registro con id ${req.params.id} eliminada`, result)

    await pgClient.end();
})

export default route;