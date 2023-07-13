import { Router } from "express";
import {
  addUsuario,
  findAll,
  findById,
  findByEmail,
  deleteUsuario,
  updateUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

// Consultar todos los uruarios
router.get("/", findAll);
// Ruta consultar por id
router.get("/:id", findById);
// Consulta user by email
router.get("/email/:email", findByEmail);
// Crear usuario
router.post("/", addUsuario);
// Eliminar usuario
router.delete("/:id", deleteUsuario);
// Modificar usuario
router.put("/:id", updateUsuario);

export default router;
