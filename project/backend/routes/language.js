import { Router } from "express";
import pg from "pg";
import dbconnection from "../../dbconnection.js";

const route = Router();

route.get("/", async (req, res) => {
    const pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let result = await pgClient.query('select * from language;');
    res.json(result.rows);

    await pgClient.end();
});

export default route;