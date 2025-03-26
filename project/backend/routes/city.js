import { Router } from "express";
import express from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

// route.use(express.json());

//GET
route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select * from city');
    res.json(result.rows);

    await pgClient.end();
});


//GET ID
route.get('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('SELECT * FROM city WHERE city_id = $1', [req.params.id]);
    res.json(result.rows[0] || { message: "Ciudad no encontrada" });

    await pgClient.end();
});



//POST
route.post("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const { city, country_id } = req.body;
    const last_update = new Date();  // La base de datos necesita este campo

    let result = await pgClient.query(
        'INSERT INTO city (city, country_id, last_update) VALUES ($1, $2, $3) RETURNING city_id',
        [city, country_id, last_update]
    );

    res.json({ message: "Ciudad insertada correctamente", city_id: result.rows[0].city_id });

    await pgClient.end();
});


//PUT
route.put("/:id", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    const { city, country_id } = req.body;
    const last_update = new Date();

    let result = await pgClient.query(
        'UPDATE city SET city = $1, country_id = $2, last_update = $3 WHERE city_id = $4',
        [city, country_id, last_update, req.params.id]
    );

    res.json({ message: "Ciudad actualizada correctamente" });

    await pgClient.end();
});


//DELETE
route.delete('/:id', async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    try {
        // Eliminar las direcciones asociadas a la ciudad
        await pgClient.query('DELETE FROM address WHERE city_id = $1', [req.params.id]);

        // Eliminar la ciudad después de asegurarnos que no hay dependencias
        await pgClient.query('DELETE FROM city WHERE city_id = $1', [req.params.id]);

        res.json({ message: 'Ciudad eliminada correctamente', city_id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando la ciudad' });
    } finally {
        await pgClient.end();
    }
});

export default route;