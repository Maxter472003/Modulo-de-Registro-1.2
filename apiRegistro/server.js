const express = require("express");
const registroRoutes = require("./registro");

const app = express();
app.use(express.json());

// Rutas
app.use("/", registroRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
