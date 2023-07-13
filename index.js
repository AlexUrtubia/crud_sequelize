import app from "./src/app.js";
import db from "./src/database/database.js";
// Modelos
import "./src/models/Usuario.models.js";


const PORT = 3002;
const main = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: false, alert: false }); // modifica db si están en true. force borra y crea tabla en caso de error (solo en dev se recomienda true, true)
    app.listen(PORT, () => {
      console.log("Servidor escucnaod en puerto", PORT);
    });
  } catch (error) {
    console.log(" Ha ocurrido un error", error)
    
  }
}

main();