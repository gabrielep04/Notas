const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Para conectarse a PostgreSQL
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notas_app',
  password: '1313',
  port: 5432,
});

const SECRET_KEY = 'secreto';

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length > 0) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

//Ruta de registro
app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
