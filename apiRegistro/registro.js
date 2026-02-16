const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/registro", async (req, res) => {
    const { email, password } = req.body;

    // Validación
    if (!email || !password || password.length < 8 || password.length > 10) {
        return res.status(400).json({ error: "Credenciales Invalidas" });
    }

    // Verificar duplicado
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
        if (err) return res.status(500).json({ error: "Error BD" });

        if (row) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        // Hash de contraseña
        const hash = await bcrypt.hash(password, 10);

        // Insertar usuario
        db.run(
            "INSERT INTO usuarios (email, password) VALUES (?, ?)",
            [email, hash],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: "Error al registrar" });
                }
                return res.status(201).json({ message: "Usuario Registrado" });
            }
        );
    });
});

module.exports = router;
