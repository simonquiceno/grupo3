import { Router } from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

// GET todas las tiendas
route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query("SELECT * FROM store");
    res.json(result.rows);

    await pgClient.end();
});

export default route;