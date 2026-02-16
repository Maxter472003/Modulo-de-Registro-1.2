const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./usuarios.db", (err) => {
    if (err) {
        console.error("Error al conectar a SQLite", err.message);
    } else {
        console.log("Conectado a SQLite");
    }
});

module.exports = db;
