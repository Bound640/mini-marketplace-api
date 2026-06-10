const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// INSCRIPTION
exports.inscription = async (req, res) => {
    try {
        const { nom, email, motdepasse } = req.body;

        if (!nom || !email || !motdepasse) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires",
            });
        }

        const existe = await User.findOne({ email });

        if (existe) {
            return res.status(400).json({
                message: "Utilisateur existe déjà",
            });
        }

        const hash = await bcrypt.hash(motdepasse, 10);

        const user = await User.create({
            nom,
            email,
            motdepasse: hash,
        });

        res.status(201).json({
            message: "Inscription réussie",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// CONNEXION
exports.connexion = async (req, res) => {
    try {
        const { email, motdepasse } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        const match = await bcrypt.compare(
            motdepasse,
            user.motdepasse
        );

        if (!match) {
            return res.status(400).json({
                message: "Mot de passe incorrect",
            });
        }

        res.status(200).json({
            message: "Connexion réussie",
            utilisateur: user.nom,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// MODIFIER NOM
exports.modifierNom = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { nom },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};