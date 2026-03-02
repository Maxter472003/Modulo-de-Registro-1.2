const express = require("express");
const db = require("./db");
const router = express.Router();

// update-role
router.put("/update-role", (req, res) => {
    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    //  VALIDAR SI EXISTE USUARIO
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: "Error BD" });

        if (!user) {
            return res.status(404).json({ message: "Usuario no existe" });
        }

        db.run(
            "UPDATE usuarios SET role = ? WHERE email = ?",
            [role, email],
            function (err) {
                if (err) return res.status(500).json({ error: "Error BD" });

                return res.status(200).json({
                    message: "Rol actualizado correctamente"
                });
            }
        );
    });
});

module.exports = router;
