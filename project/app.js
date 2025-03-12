const { Pool } = require('pg');
import express from "express";
import dbconnection from "./dbconnection";
// import pool

const app = express();
const PORT = 3080;
const pool = new Pool(dbconnection);

app.listen(PORT, () => console.log(`Servidor corriendo por el puerto ${PORT}.`))

app.use(express.static('public'))

