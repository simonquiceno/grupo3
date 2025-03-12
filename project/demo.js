import express from "express";
import pg from "pg";
// import cors from "cors";

const app = express();
const dataConnection = {
    user: 'postgres',
    host: 'localhost',
    database: 'Sakila',
    password: 'badia123',
    port: 5432,
};

// app.use(cors({origin: '*'}));

app.use(express.static('public'));
app.use()


app.get("/film", async (req, res) => {
    const pgClient = new pg.Client(dataConnection);
    await pgClient.connect();

    let result = await pgClient.query('select * from film where film_id <= 20')
    res.json(result.rows)

    await pgClient.end();
});

app.get('/film/:id', async (req, res) => {
    const pgClient = new pg.Client(dataConnection);
    await pgClient.connect();

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('select * from film where film_id = $1', [req.params.id])
    res.json(result.rows[0])

    await pgClient.end();
});

app.post('/film', async (req, res) => {
    const pgClient = new pg.Client(dataConnection);
    await pgClient.connect();

    // let result = await pgClient.query('select * from film where film_id = '+ req.params.id +';')
    let result = await pgClient.query('Insert into film values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.params.id])
    res.json(result.rows[0])

    await pgClient.end();
})

app.get("/users", async (req, res) => {
    res.json([]);
});

app.listen(3010, () => {
    console.log('listening on http://localhost:3010');
})
