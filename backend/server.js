const express = require("express");
const db = require("better-sqlite3");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const con = new db("./portal.db");
console.log("works");

app.post("/candidatos", (req, res) => {
  const data = req.body;

  const stmt = con.prepare(`
        INSERT INTO Candidato (nombre, apellido, telefono, email, linkedin, sitioWeb, provincia, ciudad, fotoPerfil, archivoCurriculum)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

  stmt.run(
    data.nombre,
    data.apellido,
    data.telefono,
    data.email,
    data.linkedin,
    data.sitioWeb,
    data.provincia,
    data.ciudad,
    data.fotoPerfil,
    data.archivoCurriculum,
  );

  res.json({ mensaje: "Candidato creado correctamente" });
});

app.get("/candidatos", (req, res) => {
  const stmt = con.prepare("SELECT * FROM Candidato");
  const candidatos = stmt.all();
  res.json(candidatos);
});

app.get("/candidatos/:id", (req, res) => {
  const candidatoId = req.params.id;
  const stmt = con.prepare("SELECT * FROM Candidato WHERE idCandidato = ?");
  const candidato = stmt.get(candidatoId);
  res.json(candidato);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
