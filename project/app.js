import express from "express";
// import pg from "pg";
import cors from 'cors';
import film from "./backend/routes/film.js";
import city from "./backend/routes/city.js";
import inventory from "./backend/routes/inventory.js";
import store from "./backend/routes/store.js";

const app = express();
const PORT = 3080;

app.use(cors({ origin: '*' }));
// app.use(express.static('public'));
app.use(express.json());


app.use('/film', film);
app.use('/city', city);
app.use('/inventory', inventory);
app.use('/store', store);

app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto ${PORT}.`);
})

