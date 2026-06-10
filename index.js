const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

// Connexion MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur Express");
});

// Routes utilisateurs
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});