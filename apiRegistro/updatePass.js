const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

// update-password
router.put("/update-password", async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    if (newPassword.length < 8 || newPassword.length > 10) {
        return res.status(400).json({ error: "Credenciales Invalidas" });
    }

    // VALIDAR SI EXISTE USUARIO
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, user) => {
        if (err) return res.status(500).json({ error: "Error BD" });

        if (!user) {
            return res.status(404).json({ message: "Usuario no existe" });
        }

        // Encriptar nueva contraseña
        const hash = await bcrypt.hash(newPassword, 10);

        db.run(
            "UPDATE usuarios SET password = ? WHERE email = ?",
            [hash, email],
            function (err) {
                if (err) return res.status(500).json({ error: "Error BD" });

                return res.status(200).json({
                    message: "Contraseña actualizada correctamente"
                });
            }
        );
    });
});

module.exports = router;
