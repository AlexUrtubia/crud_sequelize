import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usuariosRouter from "./routes/usuarios.routes.js";

const app = express();

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("tiny"));

// Rutas
app.use("/api/v1/usuarios", usuariosRouter);

app.all("*", (req, res) => {
  res.status(404).send("<h1 style='text-align:center; padding-top: 10px;'>RUTA NO EXISTE.</h1>");
})
export default app;