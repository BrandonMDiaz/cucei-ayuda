const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * These are all the GET methods for the schedules.
 * GET /schedule
 * GET /schedule/:scheduleId
 * GET /schedule/:scheduleId/subjects
 */

// GET /schedule  Returns all schedules
app.get('/schedule', (req, res) => {
  const schedules = [
    [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  ];
  res.send(schedules);
});

// GET /schedule/:scheduleId    returns specific schedule
app.get('/schedule/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  };
  res.send(schedule);
});

// GET /schedule/:scheduleId/subjects
// Returns all subjects of a method
app.get('/schedule/:scheduleId/subjects', (req, res) => {
  const subjects = {
    id: req.params.scheduleId,
    subjects: [
      {
        Materia: 'Algoritmia',
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
      },
      {
        Materia: 'Bases de Datos',
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDX',
        Aula: 'A019',
      },
    ],
  };
  res.send(subjects);
});

// POST /schedule
app.post('/schedule', (req, res) => {
  const schedule = [
    {
      Id: req.body.id1,
      Clave: req.body.clave1,
      Materia: req.body.materia1,
      Sec: req.body.sec1,
      CR: req.body.cr1,
      Hora: req.body.hora1,
      Dias: req.body.dias1,
      Edif: req.body.edif1,
      Aula: req.body.aula1,
      Profesor: req.body.profesor1,
    },
    {
      Id: req.body.id2,
      Clave: req.body.clave2,
      Materia: req.body.materia2,
      Sec: req.body.sec2,
      CR: req.body.cr2,
      Hora: req.body.hora2,
      Dias: req.body.dias2,
      Edif: req.body.edif2,
      Aula: req.body.aula3,
      Profesor: req.body.profesor2,
    },
  ];
  res.send(schedule);
});

// PUT /schedule/:scheduleId
app.put('/schedule/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: req.body.id1,
        Clave: req.body.clave1,
        Materia: req.body.materia1,
        Sec: req.body.sec1,
        CR: req.body.cr1,
        Hora: req.body.hora1,
        Dias: req.body.dias1,
        Edif: req.body.edif1,
        Aula: req.body.aula1,
        Profesor: req.body.profesor1,
      },
      {
        Id: req.body.id2,
        Clave: req.body.clave2,
        Materia: req.body.materia2,
        Sec: req.body.sec2,
        CR: req.body.cr2,
        Hora: req.body.hora2,
        Dias: req.body.dias2,
        Edif: req.body.edif2,
        Aula: req.body.aula3,
        Profesor: req.body.profesor2,
      },
    ],
  };
  res.send(schedule);
});

// DELETE /schedule/:scheduleId
app.delete('/schedule/:scheduleId', (req, res) => {
  res.send(req.params.scheduleId);
})

app.listen(3000, () => console.log('My cute app is running on port 3000!'));
