import express from "express";
// import pg from "pg";
// import cors from 'cors';
import film from "./backend/routes/film.js";
// import actor from "./backend/routes/actor.js";

const app = express();
const PORT = 3080;

// app.use(cors({ origin: '*' }));
// app.use(express.static('public'));
app.use(express.json());
// app.use();
                
app.use('/film', film);
// app.use('/actor', actor);

app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto ${PORT}.`);
})

