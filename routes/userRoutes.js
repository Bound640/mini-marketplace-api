const express = require("express");
const router = express.Router();

const {
    inscription,
    connexion,
    modifierNom,
} = require("../controllers/userController");


router.get("/inscription", (req, res) => {
    res.send("La route inscription fonctionne");
});

router.post("/inscription", inscription);

router.post("/connexion", connexion);

router.put("/modifier/:id", modifierNom);

module.exports = router;