var express = require("express");
var router = express.Router();
const { conexion } = require("../database/conexion.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  conexion.query("SELECT * FROM clinica.medicos", (error, medicos) => {
    if (error) {
      res.status(500).send("Ocurrio un error" + error);
    } else {
      res.status(200).render("medicos.hbs", { medicos, opcion: "disabled", activo: true });
    }
  });
});

router.get("/agregar", (req, res) => {
  res.status(200).sendFile("registro-medicos.html", { root: "public" });
});

router.post("/guardar-medicos", (req, res) => {
  const cedula = req.body.cedula;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const especialidad = req.body.especialidad;
  const consultorio = req.body.consultorio;
  const correo = req.body.correo;
  conexion.query(
    `INSERT INTO clinica.medicos (cedula, nombres, apellidos, especialidad, consultorio, correo) VALUES (${cedula}, '${nombres}', '${apellidos}', '${especialidad}', ${consultorio}, '${correo}')`,
    (error, resultado) => {
      if (error) {
        res.status(500).send("Ocurrio un error en la consulta" + error);
      } else {
        res.status(200).redirect("/medicos");
      }
    }
  );
});

router.get("/eliminar/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    conexion.query(
      `DELETE FROM clinica.medicos WHERE cedula=${cedula}`,
      (error, resultado) => {
        if (error) {
          res.status(500).send("Ocurrio un error en la consulta " + error);
        } else {
          res.status(200).redirect("/medicos");
        }
      }
    );
  });

  router.get("/activar", function (req, res, next) {
    conexion.query("SELECT * FROM clinica.medicos", (error, medicos) => {
      if (error) {
        res.status(500).send("Ocurrio un error" + error);
      } else {
        res.status(200).render("medicos.hbs", { medicos, opcion: "" });
      }
    });
  });
  
  router.post("/actualizar/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos
    const especialidad = req.body.especialidad;
    const consultorio = req.body.consultorio;
    const correo = req.body.correo;
    conexion.query(
      `UPDATE clinica.medicos SET nombres='${nombres}', apellidos='${apellidos}', especialidad='${especialidad}', consultorio=${consultorio}, correo='${correo}' WHERE cedula=${cedula}`,
      (error, resultado) => {
        if (error) {
          res.status(500).send("Ocurrio un error en la ejecución " + error);
        } else {
          res.status(200).redirect("/medicos");
        }
      }
    );
  });

module.exports = router;