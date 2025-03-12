import { Router } from "express";
import pg from "pg";
import dbconnection from "./dbconnection";

const route = Router();

route.post();

route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select * from film where film_id <= 20')
    res.json(result.rows)

    await pgClient.end();
});

route.get('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('select * from film where film_id = $1', [req.params.id])
    res.json(result.rows[0])

    await pgClient.end();
});

route.post('/', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('Insert into film values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.params.id])
    res.json(result.rows[0])

    await pgClient.end();
});

export default route