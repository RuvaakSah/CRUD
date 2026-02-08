const express = require('express');
const app = express();
const PORT = 3000;

// --- MIDDLEWARES (Configuración de lectura) ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DATOS DE EJEMPLO ---
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// --- RUTAS (Endpoints) ---

// 1. READ ALL: Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// 2. READ ONE: Obtener un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
});

// 3. CREATE: Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// 4. UPDATE (Bonus): Actualizar un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ mensaje: 'No se puede actualizar, usuario no encontrado' });
    }

    // Actualizamos los datos con lo que venga en el body
    usuarios[index] = { ...usuarios[index], ...req.body };
    res.json(usuarios[index]);
});

// 5. DELETE (Bonus): Eliminar un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    // Sobreescribimos el array filtrando el que queremos borrar
    usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
    
    res.json({ mensaje: `Usuario ${nombre} eliminado correctamente`, listaActualizada: usuarios });
});

// Servidor
app.listen(PORT, () => {
    console.log(`API de Street Fighter escuchando en http://localhost:${PORT}`);
});